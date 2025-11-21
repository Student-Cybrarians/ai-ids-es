const otpForm = document.getElementById("otpForm");
const otpInput = document.getElementById("otpInput");
const otpMessage = document.getElementById("otpMessage");

// Mock OTP for demo only (front-end only)
const DEMO_OTP = "123456";

if (otpForm && otpInput && otpMessage) {
  otpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const raw = otpInput.value.trim();
    if (!/^\d{6}$/.test(raw)) {
      otpMessage.textContent = "Enter a valid 6-digit OTP.";
      otpMessage.className = "otp-message text-danger";
      return;
    }

    if (raw === DEMO_OTP) {
      otpMessage.textContent = "OTP verified (demo). In real deployment, this would talk to a backend.";
      otpMessage.className = "otp-message text-ok";
    } else {
      otpMessage.textContent = "Invalid OTP (demo). Try 123456.";
      otpMessage.className = "otp-message text-danger";
    }
  });
}
