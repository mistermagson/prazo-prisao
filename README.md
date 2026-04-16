# ⚖️ Prazo Prisão

> **Gestor inteligente de prazos de revisão de prisão preventiva (Art. 316, CPP).**

O **Prazo Prisão** é uma ferramenta web de alta performance desenhada especificamente para advogados criminalistas e gestores jurídicos que precisam de um controle rigoroso sobre o prazo nonagesimal de revisão das prisões preventivas.

![Status do Projeto](https://img.shields.io/badge/Status-MVP-blueviolet?style=for-the-badge)
![Tecnologias](https://img.shields.io/badge/Stack-Vanilla_JS_|_CSS_|_HTML-blue?style=for-the-badge)

---

## 📸 Demonstração Visual

Abaixo, algumas capturas da interface em funcionamento:

````carousel
![Estado Inicial](/assets/screenshots/initial-state.png)
<!-- slide -->
![Cadastro de Processo](/assets/screenshots/add-process.png)
<!-- slide -->
![Dashboard com Alertas](/assets/screenshots/dashboard-alerts.png)
````

## ✨ Principais Diferenciais

- **Design "Premium Soft-Glass"**: Interface moderna, intuitiva e com suporte nativo ao modo escuro e alta legibilidade.
- **Cálculo Art. 316 CPP**: Lógica automatizada que calcula o prazo de 90 dias a partir da data de prisão/revisão, ignorando offsets de fuso horário.
- **Alertas de Urgência**: Cores dinâmicas (Verde, Amarelo, Vermelho) baseadas nos dias restantes.
- **Notificações Inteligentes**: Integração com a Web Notifications API para alertas de navegador e sons de aviso para prazos críticos (≤ 5 dias).
- **Privacidade Total**: Nenhum dado é enviado para servidores. Todas as informações dos processos são armazenadas exclusivamente no seu navegador via `localStorage`.

---

## 🛠️ Validação Técnica

O sistema passou pelos seguintes critérios de qualidade:

- **Lógica de Datas**: Validada com múltiplos marcos temporais para garantir precisão absoluta no cálculo de 90 dias.
- **Responsividade**: Mobile-first design testado em múltiplas resoluções.
- **Acessibilidade & UX**: Contraste otimizado e feedback auditivo configurado para situações críticas.

---

## 🚀 Como Usar

Para começar a gerenciar seus prazos imediatamente:

1. Faça o download ou clone este repositório.
2. Abra o arquivo `index.html` em qualquer navegador (Chrome, Edge, Firefox, Safari).
3. Clique em **"+ Novo Processo"**.
4. Insira o número do processo e a data da última prisão/revisão.
5. O sistema passará a monitorar o prazo automaticamente.

---

## 🛠️ Tecnologias Utilizadas

- **Estrutura**: HTML5 Semântico.
- **Estilo**: CSS3 Moderno (Variáveis CSS, Flexbox, Grid, Backdrop-Filters).
- **Lógica**: JavaScript Vanilla (ES6+).
- **Ícones**: Icons8 (Isometric Style).
- **Tipografia**: Google Fonts (Inter & Outfit).

---

## ⚖️ Base Legal: Art. 316, Parágrafo Único do CPP

> *"Decretada a prisão preventiva, deverá o órgão emissor da decisão revisar a necessidade de sua manutenção a cada 90 (noventa) dias, mediante decisão fundamentada, de ofício, sob pena de tornar a prisão ilegal."*

Esta ferramenta visa mitigar o risco de prisões ilegais por excesso de prazo, oferecendo um controle visual e auditivo proativo.

---

## 📄 Licença

Este projeto é disponibilizado para fins de auxílio jurídico. Sinta-se à vontade para utilizar e adaptar conforme sua necessidade.

---

*Desenvolvido com carinho para o ecossistema jurídico brasileiro.*
