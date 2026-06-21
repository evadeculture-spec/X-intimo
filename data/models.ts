export interface ModelLook {
  id: string;
  /** Nome do look / campanha */
  title: string;
  /** Produto/destaque Ysabel Mora */
  product: string;
  /**
   * ⚠️ FOTO REAL: caminho para a imagem do modelo em /public/models/.
   * Enquanto estiver `null`, é mostrado um placeholder elegante gerado por código.
   * Para usar a foto real: coloca o ficheiro em public/models/ e mete o caminho aqui,
   * ex.: image: "/models/look-termico.jpg"
   */
  image: string | null;
  /** Cores do placeholder (degradê) — usadas só enquanto não houver foto real. */
  from: string;
  to: string;
}

/**
 * ⚠️ EDITÁVEL — "Lookbook" de modelos com produtos Ysabel Mora.
 * As imagens são placeholders até serem substituídas por fotografias reais da marca.
 */
export const modelLooks: ModelLook[] = [
  {
    id: "termico",
    title: "Coleção Térmica",
    product: "Camisola e leggings térmicas",
    image: null,
    from: "#F6D9CF",
    to: "#C1351D",
  },
  {
    id: "interiores",
    title: "Essenciais Íntimos",
    product: "Conjunto interior sem costuras",
    image: null,
    from: "#F1ECE5",
    to: "#B7A78F",
  },
  {
    id: "meias",
    title: "Meias & Collants",
    product: "Coleção de meias Ysabel Mora",
    image: null,
    from: "#FBEDE9",
    to: "#E8755C",
  },
  {
    id: "noite",
    title: "Conforto de Noite",
    product: "Homewear suave",
    image: null,
    from: "#EFE6DC",
    to: "#9A2A16",
  },
];
