import React, { useState } from "react";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import { Check } from "@mui/icons-material";

const BudgetCell = ({ value, campaignId, endDate, onUpdate, platform, onSnackbarOpen }) => {
    const [budget, setBudget] = useState(value);
    const [selectedEndDate, setSelectedEndDate] = useState(endDate || "");
    const [isUpdating, setIsUpdating] = useState(false)

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setSelectedEndDate(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("No access token found");
            setIsUpdating(true)
            const response = await fetch("https://react-api-script.onrender.com/app/budget-change", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    platform: platform,
                    campaign_id: campaignId.toString(),
                    budget: Number(budget),
                    end_date: selectedEndDate || null,
                }),
            });

            if (!response.ok) throw new Error("Failed to update budget");

            const updatedData = await response.json();
            onUpdate(campaignId, updatedData.budget);

            onSnackbarOpen("Budget updated successfully!", "success");
        } catch (error) {
            console.error("Error updating budget:", error);

            onSnackbarOpen("Failed to update budget!", "error");
        } finally {
            setIsUpdating(false)
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 1, width: "100%", height: "100%" }}>
            <TextField
                type="number"
                variant="outlined"
                size="small"
                value={budget}
                onChange={handleBudgetChange}
                sx={{ width: "140px" }}
            />
            <IconButton color="primary" onClick={handleUpdate}>
                {isUpdating ? <CircularProgress size={24} /> : <Check />}
            </IconButton>
        </Box>
    );
};

export default BudgetCell;
