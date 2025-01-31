// * Localstorage'a veri ekleyen fonksiyon
const setToLocal = (key, data) => {
  // Datayı stringe çevir
  const strData = JSON.stringify(data);

  // Localstorage'a ekleme yap
  localStorage.setItem(key, strData);
};

const getFromLocal = (key) => {
  // Localstorage'dan belirtilen key'e sahip verileri al
  const strData = localStorage.getItem(key);

  // Veriyi Js nesnesine çevir
  const data = JSON.parse(strData);

  // Veriyi döndür
  return data;
};

const removeFromLocal = (key) => {
  // Localstorage'dan belirtilen key'e sahip verileri siler
  localStorage.removeItem(key);
};

const formatNumber = (number) => {
  if (number > 1_000_000) {
    return (number / 1_000_000).toFixed(2) + "M";
  } else {
    return number;
  }
};

export { setToLocal, getFromLocal, removeFromLocal, formatNumber };
