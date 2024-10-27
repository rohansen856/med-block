use actix_web::{web, App, HttpServer};
use dotenv::dotenv;
use std::env;
use rate_limiter::RateLimiter;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    
    // Fetch environment variables
    let port = env::var("PORT").expect("No PORT provided in env var").parse::<u16>().expect("PORT must be a valid u16");
    let redis_url = env::var("REDIS_URL").expect("No REDIS_URL provided in env var");
    let forward_url = env::var("SERVER_URL").expect("No SERVER_URL provided in env var");

    // Initialize the rate limiter with the forwarding URL
    let rate_limiter = web::Data::new(RateLimiter::new(&redis_url, forward_url));

    // Set up Actix Web server
    HttpServer::new(move || {
        App::new()
            .app_data(rate_limiter.clone())
            .route("/{tail:.*}", web::to(|req, body: String, data: web::Data<RateLimiter>| async move {
                data.handle_request(req, body).await
            }))
    })
    .bind(("127.0.0.1", port))?
    .run()
    .await
}
