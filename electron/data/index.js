export const port = 8088;

export const setArticles = async ({ ip, data }) => {
  try {
    console.log("🚀 ~ setArticles ~ setArticles:", `http://${ip}:${port}`);
    const body = {
      method: "setArticles",
      data,
    };
    const response = await fetch(`http://${ip}:${port}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    console.log("🚀 ~ setArticles ~ response:", response);

    const value = await response.json();
    return { success: true, error: false, data: value };
  } catch (e) {
    console.log("🚀 ~ setArticles ~ e:", e);
    return { error: true, success: false };
  }
};

export const setGroups = async ({ ip, data }) => {
  try {
    console.log("🚀 ~ setGroups ~ setGroups:", `http://${ip}:${port}`);
    const body = {
      method: "setGroups",
      data,
    };
    const response = await fetch(`http://${ip}:${port}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const value = await response.json();
    return { success: true, error: false, data: value };
  } catch {
    return { error: true, success: false };
  }
};

export const setTaxes = async ({ ip, data }) => {
  try {
    console.log("🚀 ~ setTaxes ~ setTaxes:", `http://${ip}:${port}`);
    const body = {
      method: "setTaxes",
      data,
    };
    const response = await fetch(`http://${ip}:${port}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    console.log("🚀 ~ setTaxes ~ response:", response);

    const value = await response.json();
    return { success: true, error: false, data: value };
  } catch (e) {
    console.log("🚀 ~ setTaxes ~ e:", e);
    return { error: true, success: false };
  }
};

// // получить все чеки за дату
// {
//   "method": "getChecks",
//   "params": {
//     "date_from": "25-04-2025",
//     "date_to": "25-04-2025"
//   },
//   "data": []
// }

export const getChecks = async ({ ip, params }) => {
  try {
    console.log("🚀 ~ setTaxes ~ setTaxes:", `http://${ip}:${port}`);
    const body = {
      method: "getChecks",
      params,
      data: [],
    };
    const response = await fetch(`http://${ip}:${port}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const value = await response.json();
    return { success: true, error: false, data: value };
  } catch {
    return { error: true, success: false };
  }
};

// //удалить все группы
// {
//   "method": "deleteGroups"
// }

export const deleteGroups = async ({ ip }) => {
  try {
    console.log("🚀 ~ setTaxes ~ setTaxes:", `http://${ip}:${port}`);
    const body = {
      method: "deleteGroups",
    };
    const response = await fetch(`http://${ip}:${port}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const value = await response.json();
    return { success: true, error: false, data: value };
  } catch {
    return { error: true, success: false };
  }
};

// //удалить все товары
// {
//   "method": "deleteArticles"
// }

export const deleteArticles = async ({ ip }) => {
  try {
    console.log("🚀 ~ setTaxes ~ setTaxes:", `http://${ip}:${port}`);
    const body = {
      method: "deleteArticles",
    };
    const response = await fetch(`http://${ip}:${port}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const value = await response.json();
    return { success: true, error: false, data: value };
  } catch {
    return { error: true, success: false };
  }
};
// //Удалить журнал

// {
//   "method": "deleteSales"
// }

export const deleteSales = async ({ ip }) => {
  try {
    console.log("🚀 ~ setTaxes ~ setTaxes:", `http://${ip}:${port}`);
    const body = {
      method: "deleteSales",
    };
    const response = await fetch(`http://${ip}:${port}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const value = await response.json();
    return { success: true, error: false, data: value };
  } catch {
    return { error: true, success: false };
  }
};
