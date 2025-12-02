"use client"

import React from "react";
import { AlertTriangle } from "lucide-react";

type Props = {
  open: boolean;
  carName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDeleteModal({ open, carName, onConfirm, onCancel }: Props) {
  if (!open) return null;

  return (
    <div className=" fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-transform duration-300 scale-95">
             <div className="p-6 text-center">
                <div className="flex items-center justify-center h-16 w-16 bg-red-100 text-red-600 rounded-full mx-auto mb-4">
                    <AlertTriangle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Remove Vehicle</h3>
                <p className="text-gray-600 mt-2">Are you sure you want to remove <strong>{carName || "this vehicle"}</strong> from the inventory? This action cannot be undone.</p>
                <div className="mt-6 flex justify-center gap-4">
                     <button onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300">Cancel</button>
                     <button onClick={onConfirm} className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700">Confirm</button>
                </div>
             </div>
        </div>
    </div>
  );
}
