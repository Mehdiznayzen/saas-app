"use server";

import { auth } from "@clerk/nextjs/server"
import { createClient } from "../supabase/client";

export const createCompanion = async (formData: CreateCompanion) => {
    try {
        const { userId: author } = await auth();

        if(!author) {
            throw new Error("Utilisateur non authentifié");
        }
        const supabase = createClient();

        const { data, error } = (await supabase.from('companions').insert({ ...formData, author }).select());

        if(error || !data) {
            throw new Error(error?.message || "Failed to create a companion");
        }

        return data[0];
    } catch (error) {
        console.error("Error while creating the companion :", error);
        throw error;
    }
}