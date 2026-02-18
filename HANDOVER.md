# HANDOVER.md — AI Coding Companion Guide

生成日時: 2026-02-18

---

## 今回やったこと

- **INTEGRATION_GUIDE.md の検証**: 実ファイルとの整合性を確認 → 内容は正確で実施可能と判断
- **tutorial.html を index.html に統合** (3箇所):
  - Hero セクションに「HANDS-ON: 日報ツールを作るチュートリアル →」リンク追加
  - TOC バー末尾に「📘 チュートリアル」リンク追加
  - Intro セクション末尾に「まず手を動かしたい方へ」callout tip 追加
- **sitemap.xml 更新**: tutorial.html エントリ追加 + lastmod を 2026-02-18 に更新
- **README.md 更新**: ファイル構成に tutorial.html を追記
- **INTEGRATION_GUIDE.md の削除安全性を確認**: どこからも参照されていないため削除可能
- **tutorial.html の TOC 位置修正**: `justify-content: center; max-width: none` を `<style>` でオーバーライド
- **技術用語ツールチップ実装**: CSS のみ（JS不要）で `.term` クラスを追加
  - 対象9語: ターミナル, PowerShell, GitHub, プッシュ, npm, Git, コミット, リポジトリ, ブランチ
  - 初出時インライン注釈 + `.term` ツールチップの2段階アプローチ

---

## 決定事項

- `main.css` は index.html との共有ファイルのため変更しない。tutorial.html 固有の変更は `<style>` ブロックでオーバーライドする
- ツールチップは CSS のみで実装（`::after` 擬似要素 + `attr(data-tip)`）
- モバイル対応はインライン注釈「（説明）」で担保し、ツールチップは PC hover 専用とする
- 各用語は「初出のみ」マークアップ。2回目以降は `.term` なし（情報過多を避ける）

---

## 捨てた選択肢と理由

| 選択肢 | 却下理由 |
|--------|---------|
| `main.css` を直接編集して TOC を修正 | index.html の TOC に影響が出るため |
| JS ベースのポップオーバー/モーダル | 実装コストに対してメリットが小さい。CSS で十分 |
| ページ上部に用語集セクションを追加 | コンテンツが増えて冗長になる。ツールチップのほうが非侵襲的 |
| 全出現箇所に `.term` を付与 | 視覚的ノイズが増える。初出のみで十分 |

---

## ハマりどころ

- 特になし。INTEGRATION_GUIDE.md の内容が正確で、実ファイルとの乖離がなかったため作業がスムーズだった

---

## 学び

- `justify-content: center` + `overflow-x: auto` の組み合わせは、項目数が少なければ問題なく機能する
- CSS `::after` + `attr(data-tip)` だけでアクセシブルなツールチップが実現できる（`:focus::after` でキーボード対応も込み）
- `main.css` を共有している場合、ページ固有のスタイルは `<style>` ブロックでオーバーライドする設計が正しい

---

## 次にやること

### 高優先度
- [ ] INTEGRATION_GUIDE.md を削除（安全確認済み）
- [ ] GitHub にプッシュ（`git add`, `git commit`, `git push`）
- [ ] 公開後に動作確認:
  - https://oshirohiroki.github.io/ （index.html の3箇所のリンク）
  - https://oshirohiroki.github.io/tutorial.html （TOC 中央寄せ、ツールチップ、リンク先）

### 低優先度（任意）
- [ ] tutorial.html の OGP 画像を専用のものに変更（現在は ogp-default.svg を流用）
- [ ] `.term` の対象語を追加する場合: `ステージング`, `localhost`, `diff` など

---

## 関連ファイル

- `index.html` — Hero/TOC/Intro に tutorial.html へのリンクを追加済み
- `tutorial.html` — TOC 修正 + ツールチップ追加済み
- `sitemap.xml` — tutorial.html エントリ追加済み
- `README.md` — ファイル構成に tutorial.html 追記済み
- `INTEGRATION_GUIDE.md` — 削除可能（次回プッシュ前に削除推奨）
