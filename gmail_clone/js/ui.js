export function showModal(modal, willOpen) {
  // Modal elemanın açılıp kapanması dışarından verilen bir willOpen değerine bağlı olarak düzenle
  modal.style.display = willOpen ? "block" : "none";

  //   modal.style.display = (willOpen ? "block") Eğer true ise eleman block olacak  : ( "none") değilse none olacak ;
}
