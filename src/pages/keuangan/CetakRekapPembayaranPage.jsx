import React from "react";
import { historyPayment } from '../../data/historyPayment'

const CetakRekapPembayaran = () => {
    const item = historyPayment

    const handlePrint = () => {
        window.print()
    };

    return (
        <div className="space-y-4 max-w-4xl mx-auto pb-12 font-sans  px-2 sm:px-0">
            
        </div>
    )
}