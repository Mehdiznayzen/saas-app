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
import { createCompanion } from "@/lib/actions/companion.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";

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

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: CompanionFormOutput) => {
    setIsSubmitting(true)

    try {
      const companion = await createCompanion(data);

      if(!companion?.id){
        throw new Error("Impossible de créer le compagnon.");
      }

      router.push(`/companions/${companion.id}`)
    } catch (error) {
      console.error("Erreur lors de la création :", error);

    }finally {
      setIsSubmitting(false);
    }
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
        type="submit"
        disabled={isSubmitting}
        className="
          group relative w-full overflow-hidden
          rounded-xl border-0 p-6
          bg-[#fe5933] text-white
          font-semibold text-base
          shadow-md shadow-orange-500/20
          transition-all duration-300
          hover:bg-[#e94a27] hover:shadow-lg
          hover:shadow-orange-500/30
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-80
          cursor-pointer
        "
      >
        <span className="relative z-10 flex items-center justify-center gap-2.5">
          {
            isSubmitting ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" />
                <span>Creating your companion...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span>Build Your Companion</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )
          }
        </span>
      </Button>
    </form>
  );
};

export default CompanionForm;