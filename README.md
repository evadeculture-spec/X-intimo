# X Íntimo — Catálogo inteligente + pedido por WhatsApp

Landing page / catálogo da **X Íntimo**, loja portuguesa de revenda de vestuário
interior, pijamas, roupa térmica e meias de marcas selecionadas (Pijamas Isa,
Ysabel Mora e outras).

Sem pagamentos online: o cliente monta uma **lista de pedido** e envia tudo por
**WhatsApp** com a mensagem já preenchida. Simples de usar e fácil de gerir.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (mobile-first)
- **Framer Motion** (animações suaves)
- **React Three Fiber / drei** (elemento 3D leve no hero, com fallback em mobile)

## Como correr

```bash
npm install
npm run dev
```

Abrir <http://localhost:3000>.

Outros comandos:

```bash
npm run build      # build de produção
npm run start      # servir o build
npm run typecheck  # verificar tipos (sem erros)
npm run lint       # ESLint
```

## Publicar na Vercel

1. Faz push deste repositório para o GitHub.
2. Em [vercel.com](https://vercel.com) → **Add New Project** → importa o repo.
3. Framework: **Next.js** (detetado automaticamente). Sem variáveis de ambiente
   obrigatórias. Clica **Deploy**.

A imagem Open Graph é gerada automaticamente em `app/opengraph-image.tsx`.

## O que editar (sem tocar no código de layout)

| O quê | Ficheiro |
| --- | --- |
| **Número de WhatsApp**, nome, contactos, redes | `lib/config.ts` (`WHATSAPP_NUMBER`, `SITE`) |
| **Texto da campanha** (faixa promo) | `lib/config.ts` (`PROMO`) |
| **Produtos** | `data/products.ts` |
| **Marcas** | `data/brands.ts` |
| **Categorias** | `data/categories.ts` |
| **Modelos / Lookbook (fotos)** | `data/models.ts` |
| **Logótipo** | `public/logo.svg` + `components/Logo.tsx` |

## Experiência 3D e efeitos

- **Hero intimista** (`components/three/SceneHero.tsx`): cortinas de cetim/seda
  em tons quentes (`SilkDrape.tsx`) a ondular devagar, com simulação de pano no
  vertex shader (normais recalculadas), material físico com sheen de tecido,
  iluminação de estúdio (`Lighting.tsx`) e pós-processamento subtil
  (bloom + vinheta). Sem texturas gráficas — só luz e material, para um
  resultado realista e sóbrio.
- **Performance e acessibilidade automáticas:**
  - Desktop → mais subdivisões e efeitos; Telemóvel → cena mais leve.
  - `prefers-reduced-motion` → fundo estático (sem 3D).
  - A cena é carregada dinamicamente, por isso **não pesa no bundle inicial**.
- **Secção Lookbook** (`components/Lookbook.tsx`): galeria editorial de modelos.

### Fotos de modelos (Lookbook)

Mesma lógica para a secção Lookbook: coloca imagens em `public/models/` e
aponta `image` em `data/models.ts`.

### Número de WhatsApp

Em `lib/config.ts`:

```ts
export const WHATSAPP_NUMBER = "351912345678"; // formato internacional, só dígitos
```

### Adicionar um produto

Em `data/products.ts`, acrescenta um objeto ao array:

```ts
{
  id: "novo-produto",          // único
  name: "Nome do produto",
  brandId: "isa",              // id de data/brands.ts
  categoryId: "pijamas",       // id de data/categories.ts
  audience: "mulher",          // "mulher" | "homem" | "crianca" | "unisexo"
  sizes: ["S", "M", "L"],
  price: 24.9,                  // número OU null => "Sob consulta"
  description: "Descrição curta.",
  badge: "Novidade",           // opcional
  image: "/produtos/foto.jpg", // opcional; se omitido usa placeholder elegante
}
```

## Logótipo (placeholder)

Como o logótipo real não foi incluído, o site usa um **wordmark placeholder**
fiel à identidade descrita (círculo terracota + "X Íntimo"). Para usar o real:

1. Substitui `public/logo.svg` pelo ficheiro real (mantém o nome).
2. Opcional: em `components/Logo.tsx`, troca o markup por
   `<img src="/logo.svg" alt="X Íntimo" className="h-9 w-auto" />`.

Todos os outros _placeholders_ (morada, horário, redes, imagens de produto,
páginas legais) estão marcados no código com `⚠️ PLACEHOLDER`.

## Estrutura

```
app/          layout, page, globals.css, opengraph-image
components/    Header, Hero, ThreeHeroElement, TrustBar, BrandHighlights,
              CategoryGrid, ProductGrid, ProductCard, Filters, PedidoDrawer,
              HowToBuy, PromoBanner, ContactSection, Footer, WhatsAppButton, ...
context/      StoreContext (lista de pedido + filtros)
data/         products.ts, brands.ts, categories.ts  ← conteúdo editável
lib/          config.ts, whatsapp.ts, types.ts
public/       logo.svg (placeholder)
```
