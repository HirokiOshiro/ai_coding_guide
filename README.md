# AI Coding Companion Guide

GitHub Pages（ユーザーサイト）向けの単一ページ静的サイトです。

## ファイル構成

- `index.html`: 本文（構造とコンテンツ）
- `tutorial.html`: ハンズオンチュートリアル（日報ツール開発）
- `assets/css/main.css`: スタイル
- `assets/js/main.js`: インタラクション（コピー機能、目次アクティブ表示、チェックリスト）
- `assets/images/ogp-default.svg`: OGP/Twitterカード用画像
- `robots.txt`: クローラ設定
- `sitemap.xml`: サイトマップ
- `404.html`: 404ページ

## 更新手順（最小）

1. 本文変更は `index.html` を更新する
2. 見た目変更は `assets/css/main.css` を更新する
3. コピー系の挙動変更は `assets/js/main.js` を更新する
4. 公開日を更新した場合は `sitemap.xml` の `<lastmod>` も更新する

## 公開後チェック

- `https://oshirohiroki.github.io/` にアクセスできる
- SNSカードの画像が表示される（`assets/images/ogp-default.svg`）
- 目次リンクで各セクションへ遷移できる
- 用語クリックでコピーが動作する
- `https://oshirohiroki.github.io/sitemap.xml` が開ける
