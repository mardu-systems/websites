"use client";

import * as React from "react";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";

const isDev = process.env.NODE_ENV === "development";

export function useRecaptcha() {
    const {executeRecaptcha} = useGoogleReCaptcha();

    return React.useCallback(
        async (action: string) => {
            if (isDev) return "recaptcha-disabled";
            if (!executeRecaptcha) return null;
            return await executeRecaptcha(action);
        },
        [executeRecaptcha],
    );
}
