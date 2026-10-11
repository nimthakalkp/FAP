
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary storage for football events
const events = [];

// Home route
app.get("/", (req, res) => {
    res.send("Football Analysis Backend is working!");
});

// Get all football events
app.get("/api/events", (req, res) => {
    res.json(events);
});

// Add a new football event

app.post("/api/events", (req, res) => {
    const event = req.body;

    // Validate required fields
    if (!event.type || !event.player || event.minute === undefined) {
        return res.status(400).json({
            message: "Please provide type, player, and minute."
        });
    }

    // Validate match minute
    if (
        !Number.isInteger(Number(event.minute)) ||
        Number(event.minute) < 0 ||
        Number(event.minute) > 120
    ) {
        return res.status(400).json({
            message: "Minute must be a whole number between 0 and 120."
        });
    }

    // Save valid event
    events.push({
        type: event.type,
        player: event.player,
        minute: Number(event.minute)
    });

    res.status(201).json({
        message: "Event saved successfully!",
        event: events[events.length - 1]
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});