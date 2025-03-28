document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const userInfo = document.getElementById("userInfo");
    const streakDisplay = document.getElementById("streak");

    const provider = new firebase.auth.GoogleAuthProvider();

    loginBtn.addEventListener("click", async () => {
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;
            console.log("Logged in as:", user.displayName);
            await updateLoginStreak(user.uid, user.displayName);
        } catch (error) {
            console.error("Login failed:", error.message);
            alert("Login failed: " + error.message);
        }
    });

    logoutBtn.addEventListener("click", async () => {
        await auth.signOut();
        userInfo.textContent = "";
        streakDisplay.textContent = "";
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
    });

    async function updateLoginStreak(userId, userName) {
        const userRef = db.collection("users").doc(userId);
        const docSnap = await userRef.get();
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        let newStreak = 1;

        if (docSnap.exists) {
            const data = docSnap.data();
            const lastLogin = data.lastLogin ? new Date(data.lastLogin) : null;
            const lastLoginStr = lastLogin ? lastLogin.toISOString().split("T")[0] : null;

            if (lastLoginStr === todayStr) {
                console.log("Already logged in today.");
                return;
            } else if (lastLogin && (today - lastLogin) / (1000 * 60 * 60 * 24) === 1) {
                newStreak = data.streak + 1;
            }

            await userRef.update({
                lastLogin: today.toISOString(),
                streak: newStreak
            });
        } else {
            await userRef.set({
                lastLogin: today.toISOString(),
                streak: 1
            });
        }

        userInfo.textContent = `Logged in as: ${userName}`;
        streakDisplay.textContent = `Current Streak: ${newStreak} days`;
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
    }

    auth.onAuthStateChanged((user) => {
        if (user) {
            updateLoginStreak(user.uid, user.displayName);
        }
    });
});
