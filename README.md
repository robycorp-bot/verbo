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

Sintaxe JavaScript verificada com `node --check`. Revisão visual em 1440×900, 390×844 e 614×471. Busca, filtros, leitura contextual e seletores dos modelos celestiais verificados no navegador. Citações da narrativa confrontadas com o texto USFM.
