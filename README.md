# Andy Sports Design — Black Friday

Landing page React + TypeScript + Vite preparada para deploy na Vercel.

## Rodar localmente

```bash
npm install
npm run dev
```

## Configuração antes de divulgar

Os links do WhatsApp e Instagram já estão configurados em `src/config/social.ts`.

O contador da campanha termina em 30/11/2026 às 00:00 no horário de Brasília.

Adicione as artes esportivas em `src/assets/artes/` (`.png`, `.jpg`, `.jpeg` ou `.webp`). Elas aparecem automaticamente na galeria em ordem alfabética pelo nome do arquivo.

Os exemplos da galeria são estudos conceituais criados em CSS e estão identificados como demonstrações. Substitua-os por trabalhos reais autorizados quando as imagens estiverem disponíveis.

## Build e publicação

```bash
npm run build
npm run preview
```

O build de produção fica em `dist/`. Para publicar, importe o repositório na Vercel e mantenha as configurações padrão do Vite: comando `npm run build`, diretório de saída `dist` e instalação `npm install`.

O `vercel.json` habilita as rotas da SPA. Na Vercel, habilite **Settings → Environment Variables → Enable access to System Environment Variables** para o build gerar canonical, Open Graph URL, `sitemap.xml` e `robots.txt` com o domínio de produção do projeto. Para builds locais com domínio próprio, defina `VITE_SITE_URL` antes de executar `npm run build`.
