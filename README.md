# luiz0067 Bootstrap Accordion 📑

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg?logo=wordpress)](https://wordpress.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952b3.svg?logo=bootstrap)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.5.2-528DD7.svg?logo=fontawesome)](https://fontawesome.com)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin WordPress moderno e intuitivo que adiciona um bloco nativo do **Gutenberg** para criação e gerenciamento de acordeões e seções recolhíveis responsivas (FAQ, sanfonas) com **Bootstrap 5.3** e ícones **Font Awesome 6**.

---

## 🚀 Principais Recursos

- **100% WYSIWYG (Fidelidade Visual)**: O que você visualiza e edita no editor Gutenberg é exatamente o que é renderizado no preview e no frontend do site.
- **Componente Bootstrap 5 Oficial**:
  - Implementa a estrutura semântica `.accordion`, `.accordion-item`, `.accordion-header`, `.accordion-button`, `.accordion-collapse` e `.accordion-body`.
  - Transições e comportamento de colapso suaves e fluidos acionados pelo Bootstrap 5 JS Bundle.
- **Modos de Exibição Flexíveis**:
  - **Accordion Padrão**: Clicar em um item recolhe os outros automaticamente (`data-bs-parent`).
  - **Sempre Aberto (Always Open)**: Permite manter múltiplos itens abertos simultaneamente sem colapsar os outros.
  - **Estilo Flush (`accordion-flush`)**: Remove bordas externas e cantos arredondados para um alinhamento perfeito de borda a borda.
- **Gerenciamento Ágil de Conteúdo**:
  - ➕ **Adicionar Item**: Inserção rápida com um clique.
  - ⬆️ / ⬇️ **Reordenação**: Botões para mover itens para cima e para baixo.
  - 📋 **Duplicar**: Clone itens existentes com conteúdo e formatação intactos.
  - 🗑️ **Excluir**: Remoção segura de itens indesejados.
  - ▾ **Alternar Visualização**: Expanda e recolha qualquer item diretamente no editor para trabalhar com tranquilidade.
- **Edição Rica e Semântica**:
  - Títulos inline com suporte a tags semânticas configuráveis (**H2, H3, H4, H5, H6 ou DIV**) para otimização de SEO e acessibilidade.
  - Conteúdo do corpo com formatação rica (`wp.blockEditor.RichText`), aceitando listas, negrito, itálico, links e múltiplos parágrafos.
- **Personalização de Cores**:
  - Ajuste personalizado da cor de fundo e texto do cabeçalho ativo na barra lateral do editor.
- **Internacionalização Pronta (i18n)**:
  - Totalmente traduzido em **Português do Brasil (pt-BR)**, **Inglês (en)** e **Espanhol (es)**.
  - Menu de configurações no WordPress (`Configurações > luiz0067 Accordion`) para fixar o idioma ou detectar automaticamente.
- **Compatibilidade Global**:
  - Compatível com **Block Themes** (Full Site Editing - FSE) e **Classic Themes**.
  - Não depende de CDNs externas: todos os arquivos Bootstrap 5 e Font Awesome estão inclusos no plugin.

---

## 📂 Estrutura do Projeto

```
luiz0067-accordion/
├── assets/
│   ├── bootstrap/
│   │   ├── css/bootstrap.min.css       # Bootstrap 5.3 CSS
│   │   └── js/bootstrap.bundle.min.js  # Bootstrap 5.3 JS Bundle (Popper)
│   └── fontawesome/
│       ├── css/all.min.css             # Font Awesome 6 CSS
│       └── webfonts/                   # Arquivos de fontes
├── js/
│   └── blocks/
│       └── accordion.js                # Bloco Gutenberg nativo (edit, save, inspector)
├── languages/
│   ├── pt-br.json                      # Tradução em Português
│   ├── en.json                         # Tradução em Inglês
│   └── es.json                         # Tradução em Espanhol
├── plugin/
│   ├── blocks.php                      # Registro do bloco e scripts
│   └── settings.php                    # Painel de configurações no admin WP
├── luiz0067-accordion.php              # Arquivo principal do plugin
├── style.css                           # Estilos visuais e compatibilidade Gutenberg
├── readme.txt                          # Metadados oficiais WordPress.org
└── README.md                           # Documentação do repositório
```

---

## 🛠️ Instalação

### Opção 1: Via Painel WordPress (ZIP)
1. Compacte esta pasta ou baixe o release `.zip`.
2. No painel do WordPress, acesse **Plugins > Adicionar Novo > Enviar Plugin**.
3. Selecione o arquivo `.zip` e clique em **Instalar Agora**.
4. Ative o plugin.

### Opção 2: Via FTP / Diretório de Plugins
1. Copie a pasta `luiz0067-accordion` para o diretório `/wp-content/plugins/` da sua instalação WordPress.
2. Acesse o painel administrativo em **Plugins**.
3. Localize **luiz0067 Bootstrap Accordion** e clique em **Ativar**.

---

## 💡 Como Usar

1. Crie ou edite um post ou página no **Gutenberg**.
2. Clique no botão **`+`** para adicionar um bloco e busque por **"Accordion"** ou **"luiz0067"**.
3. O bloco será inserido com itens de exemplo já prontos.
4. Digite o título do item diretamente no cabeçalho e edite o conteúdo do painel com facilidade.
5. Utilize a barra lateral (**Inspector**) para escolher o estilo (*Flush*, *Sempre Aberto*, tag de título e cores).
6. Publique ou atualize sua página!

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo de licença para mais informações.

Desenvolvido por [Luiz Fernando Brogliatto Ferreira](https://github.com/luiz0067yahoo).
