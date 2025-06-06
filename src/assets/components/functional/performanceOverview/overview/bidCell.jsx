import React, { useState } from "react";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import { Check } from "@mui/icons-material";

const BidCell = ({ value, campaignId, onUpdate, platform, keyword, matchType, onSnackbarOpen }) => {
    const [bid, setBid] = useState(value);
    const [isUpdating, setIsUpdating] = useState(false)

    const handleBidChange = (e) => {
        setBid(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("No access token found");
            setIsUpdating(true)
            const response = await fetch("https://react-api-script.onrender.com/app/bid-change", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    platform: platform,
                    campaign_id: campaignId.toString(),
                    bid: Number(bid),
                    keyword: keyword,
                    match_type: matchType
                }),
            });

            if (!response.ok) throw new Error("Failed to update bid");

            const updatedData = await response.json();
            onUpdate(campaignId, updatedData.keyword, updatedData.bid, updatedData.match_type);

            onSnackbarOpen("Bid updated successfully!", "success");
        } catch (error) {
            console.error("Error updating bid:", error);

            onSnackbarOpen("Failed to update bid!", "error");
        } finally {
            setIsUpdating(false)
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, width: "100%", height: "100%" }}>
            <TextField
                type="number"
                variant="outlined"
                size="small"
                value={bid}
                onChange={handleBidChange}
                sx={{ width: "80px" }}
            />
            <IconButton color="primary" onClick={handleUpdate}>
                {isUpdating ? <CircularProgress size={24} /> : <Check />}
            </IconButton>
        </Box>
    );
};

export default BidCell;
