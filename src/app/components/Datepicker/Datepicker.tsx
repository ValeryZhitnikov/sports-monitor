"use client";

import * as React from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

export const Datepicker = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    React.useEffect(() => {
        const picker = new AirDatepicker('#datepicker', {
        onSelect({ date }) {
            const selectedDate = Array.isArray(date) ? date[0] : date;

            if (!selectedDate) return;

            const params = new URLSearchParams(searchParams.toString());
            console.log(selectedDate);
            params.set("date", selectedDate.toISOString());

            router.push(`/?${params.toString()}`);
            router.refresh();
        }
        });

        return () => picker.destroy();
    },[]);

    return (
        <div id="datepicker"></div>
    );
};

Datepicker.displayName = "Datepicker";