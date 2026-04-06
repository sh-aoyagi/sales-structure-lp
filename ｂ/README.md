# 相談前に見極めるページ

BtoB向け・1ページコンサルポートフォリオサイト。  
展示会 / 提案書 / LP / バナーの依頼先として相談前に判断してもらうためのページです。

---

## ファイル構成

```
/
├── index.html   メインページ（1ページ完結）
├── style.css    スタイル
├── script.js    インタラクション（ヒーロークロスフェード・スクロールリビール・パララックス）
└── README.md    このファイル
```

---

## GitHub Pages への公開手順

1. GitHub で新しいリポジトリを作成（例: `portfolio`）
2. このフォルダの内容をすべてリポジトリのルートにプッシュ
3. リポジトリの **Settings → Pages** を開く
4. **Branch: main / root** を選択して **Save**
5. 数分後に `https://あなたのユーザー名.github.io/リポジトリ名/` で公開される

---

## カスタマイズ箇所

### Threads リンク
`index.html` 内の以下を実際のThreadsユーザー名に変更してください。

```html
href="https://www.threads.net/@yourusername"
```

### ヒーロー画像
現在はUnsplash（CDN）の画像を使用しています。  
自分の実績写真に差し替える場合は、`index.html` の `background-image:url(...)` を変更してください。

```html
<div class="hero-slide active" style="background-image:url('images/hero1.jpg')"></div>
```

自前画像を使う場合は `images/` フォルダを作成してそこに配置します。

### アナザークリエイト画像
`.another-img-wrap img` の `src` を実際の制作物画像に差し替えてください。

### コピーライト表記
`index.html` 末尾のフッターの年号と名前を変更してください。

```html
<p>© 2024 あなたの名前 All rights reserved.</p>
```

---

## 技術スタック

- HTML5 / CSS3 / Vanilla JS（外部依存なし）
- Google Fonts: Cormorant Garamond + Noto Serif JP
- IntersectionObserver によるスクロールリビール
- CSS Transition によるクロスフェード

---

## レビューレポート

| 観点 | 判定 | 備考 |
|---|---|---|
| archidomo.fr の空気感と一致しているか | ✅ | 余白・セリフ体・暗背景の組み合わせで踏襲 |
| 画像と余白で没入感が出ているか | ✅ | ヒーロー全画面クロスフェード、各セクション大画像 |
| BtoBの信頼感があるか | ✅ | モノトーン基調、静かな動き、短い文章 |
| 相談前に見極めるページとして機能しているか | ✅ | 思想・実力・審美眼の3段構成で判断材料を提供 |
| スマホで読みやすいか | ✅ | モバイルファースト設計、clampによる可変フォント |
| CTAが自然か | ✅ | 各セクション末尾にテキストCTA、最終のみボタン |
| リンク切れがないか | ⚠️ | Threads URLの`@yourusername`部分は要変更 |

### 修正できない点（手動対応が必要）

- **Threads リンク**: `@yourusername` を実際のアカウント名に変更してください
- **ヒーロー画像 / カード画像**: 現在はUnsplash CDN画像を使用。自分の実績写真への差し替えを推奨します（GitHubにimagesフォルダを追加）
- **インタビューページ / デモページ**: 「インタビューを読む →」「デモ制作を見る →」のリンク先は現在 `#contact` に設定しています。別ページを作成した場合はhrefを更新してください
