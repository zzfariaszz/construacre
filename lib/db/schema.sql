-- Categorias
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icone VARCHAR(50) NOT NULL DEFAULT 'Package',
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  codigo_interno VARCHAR(20) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
  foto_url TEXT,
  destaque BOOLEAN DEFAULT false,
  disponivel BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Vendedores (página Equipe)
CREATE TABLE IF NOT EXISTS vendedores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  foto_url TEXT,
  whatsapp VARCHAR(20) NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Catálogo/encarte em PDF
CREATE TABLE IF NOT EXISTS catalogo (
  id SERIAL PRIMARY KEY,
  arquivo_url TEXT NOT NULL,
  atualizado_em TIMESTAMP DEFAULT NOW()
);

-- Categorias iniciais (seed)
INSERT INTO categorias (nome, slug, icone) VALUES
  ('Cimento', 'cimento', 'Layers'),
  ('Elétrica', 'eletrica', 'Zap'),
  ('Hidráulica', 'hidraulica', 'Droplet'),
  ('Ferramentas', 'ferramentas', 'Wrench'),
  ('Portas', 'portas', 'DoorOpen'),
  ('Pisos', 'pisos', 'Grid3x3')
ON CONFLICT (slug) DO NOTHING;