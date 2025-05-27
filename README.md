# 📱 Personal Finance Tracker – National Integrated Assessment Exam

## 📝 Project Overview

**ABCD Ltd**, a Kigali-based software company, has been contracted to develop a **cross-platform mobile application** to help individuals manage their personal finances. The application must be compatible with **Android** and **iOS** platforms using **React Native**.

As a mobile app developer, task was to build a **Personal Finance Tracker** app that allows users to:

- Log in using valid credentials
- Record daily expenses
- View individual expense details
- List all expenses
- Delete expenses
- Receive meaningful error messages and ensure smooth UI/UX

---

## 🛠 Technologies Used

- 📱 **React Native** (with Expo)
- 🧠 **Recoil** for state management
- 🔒 **AsyncStorage** for session handling
- 🔄 **Axios** for API communication
- 🌐 **MockAPI** for backend endpoints
- 🌍 Cross-platform compatibility (Android and iOS)

---

## 🧪 Exam Requirements

### ✅ Functional Requirements

| Task # | Description                                 | Endpoint Used                        |
|--------|---------------------------------------------|--------------------------------------|
| 1      | Allow user login using username & password  | `GET /users?username={email}`        |
| 2      | Create a new expense                       | `POST /expenses`                     |
| 3      | View expense details                       | `GET /expenses/{expenseId}`          |
| 4      | List all expenses                          | `GET /expenses`                      |
| 5      | Delete a specific expense                  | `DELETE /expenses/{expenseId}`       |

---

## 🔗 API Base URL

```
https://67ac71475853dff153dab929.mockapi.io/api/v1
```

- **Users** endpoint: `/users`
- **Expenses** endpoint: `/expenses`

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/personal-finance-tracker.git
cd personal-finance-tracker
```

### 2. Install Dependencies

```bash
  pnpm install
```

### 3. Start the App

```bash
  pnpm dev
```

---

## 📋 Notes

- Input validation and error handling are implemented throughout the app.
- All API requests use **axios**.
- Test the app using **Expo CLI** on Android/iOS simulators or physical devices.