use actix_web::{HttpRequest, HttpResponse, Responder};
use redis::{Client, AsyncCommands};
use reqwest::{Client as HttpClient, header::{HeaderMap, HeaderName}};
use serde_json::json;
use std::sync::Arc;
use tokio::sync::Mutex;

pub struct RateLimiter {
    redis_client: Arc<Mutex<Client>>,
    forward_url: String,
    http_client: HttpClient,
}

impl RateLimiter {
    // Initialize a new RateLimiter with Redis client and forwarding URL
    pub fn new(redis_url: &str, forward_url: String) -> Self {
        let client = Client::open(redis_url).expect("Invalid Redis URL");
        RateLimiter {
            redis_client: Arc::new(Mutex::new(client)),
            forward_url,
            http_client: HttpClient::new(),
        }
    }

    // Handle request with rate limiting, Redis interaction, and forwarding
    pub async fn handle_request(
        &self,
        req: HttpRequest,
        body: String,
    ) -> impl Responder {
        let redis_client = self.redis_client.clone();
        let mut con = redis_client.lock().await.get_multiplexed_async_connection().await.unwrap();

        // Extract the user IP and increment request count in Redis
        let user_ip = req.peer_addr().map(|addr| addr.ip().to_string()).unwrap_or_else(|| "unknown".to_string());
        let _: () = con.incr(user_ip.clone(), 1).await.unwrap();
        let _: () = con.expire(user_ip.clone(), 10).await.unwrap();
        let req_count: i32 = con.get(user_ip.clone()).await.unwrap_or(0);

        println!("{user_ip}: {req_count}");

        // Check if the request count exceeds the limit
        if req_count > 10 {
            return HttpResponse::TooManyRequests().json(json!({
                "error": "Rate limit exceeded. Please try again later."
            }));
        }

        // Prepare headers to forward
        let headers_map: HeaderMap = req
            .headers()
            .iter()
            .filter_map(|(key, value)| {
                HeaderName::from_bytes(key.as_ref())
                    .ok()
                    .zip(value.to_str().ok().map(|v| v.to_string()))
            })
            .map(|(k, v)| (k, v.parse().unwrap()))
            .collect();

        // Convert Actix method to reqwest method
        let method = req.method().as_str().parse::<reqwest::Method>().unwrap_or(reqwest::Method::GET);

        // Forward the request to the target server
        let response = match self.http_client
            .request(method, &self.forward_url)
            .headers(headers_map)
            .body(body.clone())
            .send()
            .await
        {
            Ok(res) => res,
            Err(_) => return HttpResponse::InternalServerError().json(json!({"error": "Failed to forward request"})),
        };

        // Return the forwarded response
        let status = actix_web::http::StatusCode::from_u16(response.status().as_u16()).unwrap_or(actix_web::http::StatusCode::INTERNAL_SERVER_ERROR);
        let response_body = response.text().await.unwrap_or_default();
        HttpResponse::build(status).body(response_body)

    }
}
