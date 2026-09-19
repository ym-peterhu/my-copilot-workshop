# GitHub Copilot 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App，使用原生前端技術建立，提供簡潔的待辦事項管理與主題切換功能。

## 線上展示

[開啟 GitHub Pages 線上展示](https://ym-peterhu.github.io/my-copilot-workshop)

## 功能

- 新增待辦事項，並自動忽略前後空白內容。
- 將待辦事項標記為已完成或切換回未完成。
- 刪除個別待辦事項。
- 依「全部」、「未完成」或「已完成」篩選待辦事項。
- 顯示目前未完成的待辦事項數量。
- 一次清除所有已完成的待辦事項，操作前會先要求確認。
- 支援深色模式與淺色模式切換。
- 在尚未手動選擇主題時，依照作業系統的顯示模式設定。
- 記住待辦事項與手動選擇的主題設定，重新載入頁面後仍可保留。
- 清單為空時，依目前的篩選條件顯示對應提示文字。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript 開發。
- 不使用前端框架或第三方套件。
- 待辦事項與主題設定使用瀏覽器的 `localStorage` 儲存。
- 透過 DOM API 建立與更新待辦事項清單，並使用事件處理使用者操作。

## 開發方式

本專案在 GitHub Copilot 實戰工作坊中，透過 GitHub Copilot Agent Mode 協助理解需求、修改程式與驗證結果。開發過程也搭配 MCP 取得 GitHub 工作流程所需的資訊，並使用 `.github/prompts` 中的提示檔定義處理 issue 的步驟與規則。

這些工具共同形成 agentic workflow：先讀取 issue 與專案脈絡，再提出修改計畫並等待確認，接著依照專案指引完成修改、驗證、提交、推送及建立 Pull Request。

## 我學到什麼

- 如何使用 GitHub Copilot Agent Mode 將需求拆解成可執行的開發步驟。
- 如何透過 MCP 將 GitHub issue、分支與 Pull Request 流程串接起來。
- 如何使用 `.github/prompts` 將團隊的開發規範與工作流程寫成可重複使用的指引。
- 如何在不使用框架與套件的前提下，使用原生 JavaScript 管理 DOM、事件與瀏覽器儲存資料。
- 如何透過功能測試與瀏覽器操作確認待辦清單的行為符合需求。
