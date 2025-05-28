const axios = require("axios");

const LINE_ACCESS_TOKEN = "qMPkVkyUcpU6UI4IcShLOHqmQNbYNaclgBOMszUyILUXRDBCDXWoFpLQagN6ptNTMf77dQyXlfLwSTemqGHf6f+gzy6ixjrONbxhrsZ5NtKbvKJZ2mVhU4uoBZu8zYPbTRq6pEebAF1+PiAhquC/eQdB04t89/1O/w1cDnyilFU=";

// !! ต้องใส่ userId ของผู้ใช้ ไม่ใช่ @ID
const USER_ID = "PetFeeder Bot"; // เช่น U58d7a30....xxxx

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { status } = req.body;

  let message = "";
  if (status === "start") {
    message = "🐾 กำลังให้อาหารสัตว์...";
  } else if (status === "done") {
    message = "✅ ให้อาหารเสร็จเรียบร้อยแล้ว!";
  } else {
    return res.status(400).send("Invalid status");
  }

  try {
    await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: USER_ID,
        messages: [{ type: "text", text: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
        },
      }
    );
    res.status(200).send("Message sent");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("LINE API error");
  }
};
