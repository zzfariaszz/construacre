# Construacre — Site Institucional

Site institucional e painel administrativo para a **Construacre**, loja de materiais de construção com 35 anos de tradição em Cruzeiro do Sul, Acre.

**Demo:** [construacre.vercel.app](https://construacre.vercel.app)

---

## Sobre o projeto

Site multi-página com catálogo de produtos, painel administrativo protegido por autenticação, upload de imagens e gestão de conteúdo sem necessidade de alterar código — tudo gerenciável pela própria loja através do painel `/admin`.

### Principais funcionalidades

- **Catálogo de produtos** com busca, filtro por categoria e URLs individuais por categoria (SEO-friendly)
- **Painel administrativo** protegido por senha, com CRUD completo de:
  - Produtos (com código interno, upload de foto, categoria, destaque e disponibilidade)
  - Categorias (com escolha de ícone)
  - Vendedores (com WhatsApp individual)
  - Galeria de fotos da loja
- **Página de Equipe** — clique na foto do vendedor e é direcionado ao WhatsApp individual
- **Botão de WhatsApp flutuante** em todas as páginas
- **Layout 100% responsivo** (mobile-first)
- **Sistema de favoritos** no catálogo (sem necessidade de login do cliente)

---

## Tecnologias utilizadas

| Categoria | Tecnologia |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Linguagem | TypeScript |
| Estilização | Styled Components |
| Banco de dados | Vercel Postgres ([Neon](https://neon.tech/)) |
| Armazenamento de imagens | Vercel Blob |
| Autenticação | JWT (`jsonwebtoken` + `jose`) com senha hasheada via `bcryptjs` |
| Ícones | [Lucide React](https://lucide.dev/) |
| Deploy | Vercel |

---

## Arquitetura
app/
├── admin/              # Login e painel administrativo (rota protegida)
│   └── dashboard/
│       ├── produtos/
│       ├── categorias/
│       ├── vendedores/
│       └── galeria/
├── api/                # API Routes (produtos, categorias, vendedores, upload, auth)
├── produtos/           # Catálogo público + rota dinâmica por categoria
├── equipe/             # Página da equipe de vendedores
├── sobre/              # Institucional + galeria da loja
└── contato/            # Formulário de contato
components/             # Componentes reutilizáveis (Header, ProdutoCard, etc.)
lib/
├── db/                 # Funções de acesso ao banco (uma por entidade)
└── auth.ts             # Lógica de autenticação e sessão
middleware.ts           # Proteção de rotas do admin

---

## Rodando localmente

```bash
git clone https://github.com/zzfariaszz/construacre.git
cd construacre

npm install

# Configurar variáveis de ambiente
# Criar um .env.local com:
# POSTGRES_URL, BLOB_READ_WRITE_TOKEN, ADMIN_PASSWORD_HASH, AUTH_SECRET

npm run dev
```

Abra http://localhost:3000 no navegador.

---

## Deploy

Deploy contínuo via [Vercel](https://vercel.com), integrado ao GitHub — todo push na branch main gera um novo deploy automaticamente.

Bancos de dados (Postgres e Blob Storage) provisionados diretamente pelo painel da Vercel.

---

## Autor

Desenvolvido por [Felipe Farias](https://github.com/zzfariaszz).
