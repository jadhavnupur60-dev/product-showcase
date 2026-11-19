
import React, { useEffect, useState } from "react";

function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstall
    );

    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstall
      );

      window.removeEventListener(
        "appinstalled",
        handleInstalled
      );
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();

    const choice = await installPrompt.userChoice;

    console.log("Installation choice:", choice.outcome);

    setInstallPrompt(null);
  };

  if (installed) {
    return <p>App successfully installed!</p>;
  }

  if (!installPrompt) {
    return null;
  }

  return (
    <div style={{ textAlign: "center", padding: "15px" }}>
      <button onClick={installApp}>
        Add to Home Screen
      </button>
    </div>
  );
}

export default InstallPWA;
