# O Verbo

Experiência estática em português sobre Jesus Cristo. Cena Three.js local, oito capítulos, quatro modelos celestiais, som ambiente opcional e biblioteca bíblica pesquisável.

## Executar

Sirva `dist/` com um servidor HTTP estático, por exemplo:

```sh
python -m http.server 4173 --directory dist
```

## Conteúdo

Textos bíblicos: Bíblia Portuguesa Mundial (BPM), domínio público, edição ainda em revisão. Os resumos e os temas são editoriais; as reconstruções são artísticas. Consulte `dist/data/bible-sources.txt` e o painel de fontes do site.

O corpus reúne todos os 2.290 segmentos delimitados como falas de Jesus pela edição USFM de referência, agrupados em 612 partes. A atribuição acompanha os marcadores da edição, inclusive citações e passagens de atribuição discutida. Não pretende reconstruir tudo o que Jesus disse em vida.

Os Evangelhos incluem 89 capítulos completos. Lucas 17:36 não tem texto no corpo principal da fonte e apresenta nota editorial no leitor.

## Dependências

Three.js 0.169.0, licença MIT. Fontes Cormorant Garamond e Manrope, licença SIL Open Font License. As licenças estão junto aos arquivos distribuídos. Não há dependências externas em tempo de execução.

## Verificação

Sintaxe JavaScript verificada com `node --check`. Verificação do corpus com `node verify.mjs` e testes de gestos com `node --test gesture.test.mjs`.

Revisão mobile no navegador em 320×568, 390×844 e 844×390, incluindo os oito capítulos, ausência de sobreposição com cabeçalho/rodapé, busca, filtros, leitura contextual, narrativa completa, modelos celestiais, pausa e áudio. Leitor também conferido em 390×400 para espaço reduzido durante entrada de texto. Os controles principais têm áreas de toque de 44px e os campos usam 16px para evitar zoom de foco no iOS.

Modelos celestiais usam cache para reutilizar recursos GPU, e a renderização para em pausa ou com a aba oculta. A densidade de pixels é recalculada ao girar a tela. As medições foram feitas com emulação de viewport no navegador; não substituem teste em aparelhos físicos com Safari e Chrome mobile.

Citações da narrativa confrontadas com o texto USFM.
