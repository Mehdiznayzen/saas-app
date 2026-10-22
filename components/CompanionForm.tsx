
"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  voice: z.string().min(1, { message: "Voice is required" }),
  style: z.string().min(1, { message: "Style is required" }),
  duration: z.coerce.number().min(1, { message: "Duration is required" }),
});

type CompanionFormInput = z.input<typeof formSchema>;
type CompanionFormOutput = z.output<typeof formSchema>;

const CompanionForm = () => {
  const form = useForm<CompanionFormInput, any, CompanionFormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: 15,
      style: "",
      subject: "",
      topic: "",
      voice: "",
    },
  });

  const onSubmit = (data: CompanionFormOutput) => {
    console.log(data);
  };

  return (
    <form 
      className="space-y-8"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel >
                Companion name
              </FieldLabel>
              <Input
                {...field}
                placeholder="Enter the companion name"
                className="input p-5"
              />
              {
                fieldState.invalid && (
                  <FieldError 
                    errors={[fieldState.error]} 
                  />
                )
              }
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Subject
              </FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                  <SelectTrigger className="input p-5 capitalize">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      subjects.map((subject) => (
                        <SelectItem
                          value={subject}
                          key={subject}
                          className="capitalize"
                        >
                          {subject}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
              </Select>
              {
                fieldState.invalid && (
                  <FieldError 
                    errors={[fieldState.error]} 
                  />
                )
              }
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="topic"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                What should the companion help with ?
              </FieldLabel>
              <Textarea
                {...field}
                placeholder="Ex. Derivates & Integrals"
                className="input p-2"
              />
              {
                fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]} 
                  />
                )
              }
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="voice"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Voice
              </FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                  <SelectTrigger className="input p-5">
                      <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value={"male"}
                      className="capitalize"
                    >
                      Male
                    </SelectItem>
                    <SelectItem
                      value={"Female"}
                      className="capitalize"
                    >
                      Female
                    </SelectItem>
                  </SelectContent>
              </Select>
              {
                fieldState.invalid && (
                  <FieldError 
                    errors={[fieldState.error]} 
                  />
                )
              }
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="style"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Style
              </FieldLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                  <SelectTrigger className="input p-5">
                      <SelectValue placeholder="Select the style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value={"formal"}
                      className="capitalize"
                    >
                      Formal
                    </SelectItem>
                    <SelectItem
                      value={"casual"}
                      className="capitalize"
                    >
                      Casual
                    </SelectItem>
                  </SelectContent>
              </Select>
              {
                fieldState.invalid && (
                  <FieldError 
                    errors={[fieldState.error]} 
                  />
                )
              }
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="duration"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Estimated session duration in minutes
              </FieldLabel>

              <Input
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                type="number"
                placeholder="15"
                className="input p-5"
                value={field.value === undefined ? "" : String(field.value)}
                onChange={(event) => field.onChange(event.target.value)}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <Button 
        className={"w-full cursor-pointer p-5"} 
        type="submit"
      >
        Build Your Companion
      </Button>
    </form>
  );
};

export default CompanionForm;