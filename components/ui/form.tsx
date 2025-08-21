"use client"

import * as React from "react"
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form"

interface FormProps<T extends FieldValues> {
  children: React.ReactNode
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
}

export function Form<T extends FieldValues>({
  children,
  form,
  onSubmit,
}: FormProps<T>) {
  if (!form || typeof form.handleSubmit !== "function") {
    console.error("❌ 'form' prop is missing or invalid in <Form />.")
    return (
      <div className="p-4 text-sm bg-red-100 text-red-700 rounded">
        ⚠️ Form setup error: <code>form</code> is missing or invalid. Did you forget to call <code>useForm()</code>?
      </div>
    )
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  )
}

// ------------------------
// Optional Subcomponents
// ------------------------

export function FormField({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return <div className="form-field">{children}</div>
}

export function FormItem({ children }: { children: React.ReactNode }) {
  return <div className="form-item space-y-1">{children}</div>
}

export function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="form-label block text-sm font-medium text-foreground">
      {children}
    </label>
  )
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <div className="form-control">{children}</div>
}

export function FormMessage({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm text-red-500">{message}</p>
}
