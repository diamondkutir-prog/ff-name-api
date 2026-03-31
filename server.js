const express = require("express");
const axios = require("axios");
const app = express();

// Player Name API
app.get("/player-info", async (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: "UID দিতে হবে" });
  }

  // Default region = BD
  const region = req.query.region || "BD";

  try {
    // OB49 Free Fire API
    const apiUrl = `https://info-ob49.vercel.app/api/account/?uid=${uid}&region=${region}`;
    const response = await axios.get(apiUrl);

    // শুধু player নাম
    const playerName = response.data?.username || "Unknown";

    res.status(200).json({
      success: true,
      region: region,
      username: playerName
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "API fetch ত্রুটি",
      details: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
