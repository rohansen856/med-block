"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { MedicalContract } from "./contract"
import { NavBar } from "./metamask"

const FormSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  aadharNumber: z.string().min(12, {
    message: "Aadhar number must be 12 digits.",
  }),
  mbbsId: z.string().min(1, {
    message: "MBBS ID is required.",
  }),
  specialty: z.string().min(1, {
    message: "Specialty is required.",
  }),
  blockId: z.string().startsWith("0x", {
    message: "Invalid account address.",
  }),
  fees: z
    .number()
    .min(1, {
      message: "Fees too low!",
    })
    .max(100, {
      message: "Fees more than 1 ETH not allowed!",
    }),
})

type FormData = z.infer<typeof FormSchema>

interface DoctorFormProps extends React.HTMLAttributes<typeof Form> {
  userId: string
}

export function DoctorForm({ ...props }: DoctorFormProps) {
  const [address, setAddress] = useState("")
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
      aadharNumber: "",
      mbbsId: "",
      specialty: "",
      blockId: "",
    },
  })

  async function onSubmit(data: FormData) {
    console.log(data)
    try {
      const contract = new MedicalContract(data.blockId)
      await contract.init()
      // contract.registerDoctor("doc-oc", data.specialty, 1000)
      const res = await axios.post("/api/users/doctor", {
        ...data,
        userId: props.userId,
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (address) form.setValue("blockId", address)
  }, [address])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[500px] max-w-full p-4 space-y-6"
      >
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aadharNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhar Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Aadhar number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mbbsId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MBBS ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter MBBS ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialty</FormLabel>
              <FormControl>
                <Input placeholder="Enter specialty" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fees</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your fees (100 unit = 1 ETH)"
                  onChange={(e) => {
                    form.setValue("fees", Number.parseFloat(e.target.value))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="blockId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Block ID</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input placeholder="Account address" {...field} disabled />
                  <NavBar setAddress={setAddress} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
