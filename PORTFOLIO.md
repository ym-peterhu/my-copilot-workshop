![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以純前端技術實作，提供簡潔的待辦事項管理與主題切換功能，並透過 GitHub Pages 公開展示。

## 線上展示

[查看線上版本](https://ym-peterhu.github.io/my-copilot-workshop)

## 功能

- 新增待辦事項，空白內容不會建立項目
- 勾選待辦事項以標記完成，亦可取消完成狀態
- 刪除單筆待辦事項
- 依「全部」、「未完成」與「已完成」篩選清單
- 即時顯示未完成待辦事項數量
- 支援深色與淺色模式切換
- 未手動選擇主題時，會依照作業系統的色彩偏好設定
- 記住使用者選擇的主題設定
- 將待辦事項儲存在瀏覽器的 `localStorage`，重新整理後仍會保留資料
- 在待辦清單為空或篩選結果為空時，顯示對應提示文字
- 採用響應式版面，支援手機螢幕瀏覽

## 技術

- 使用 HTML、CSS 與原生 JavaScript
- 不使用任何前端框架或第三方套件
- 不使用建置工具或外部 CDN，可直接以靜態檔案運作
- 使用瀏覽器 `localStorage` 儲存待辦事項與主題偏好
- 使用 CSS 變數管理介面色彩，並搭配 `prefers-color-scheme` 判斷系統主題
- 透過 GitHub Pages 部署靜態網站

## 開發方式

本專案在 GitHub Copilot 實戰工作坊中，結合以下 agentic workflow 完成：

- **GitHub Copilot Agent Mode**：根據需求協助規劃與實作待辦清單介面、互動功能，以及後續的多檔案修改。
- **MCP**：透過 MCP 連接 Microsoft Learn 與 GitHub 等工具，協助查詢官方文件與讀取 GitHub issue，讓開發流程能取得專案外部的相關資訊。
- **`.github/prompts`**：以 `.github/prompts/fix-issue.prompt.md` 定義可重複執行的 issue 處理流程，包含讀取 issue、提出修改計畫、建立分支、修改程式、驗證，以及建立 Pull Request。
- **專案規範**：以 `.github/copilot-instructions.md` 記錄技術限制、程式風格與協作方式，讓後續的 Agent 工作維持一致。

## 我學到什麼

- Agent Mode 著重於完成目標與協調多個開發步驟，不只是提供單段程式碼補全。
- 清楚且完整的需求與專案規範，有助於讓 AI 產出的修改更符合預期。
- MCP 能讓 AI 連結官方文件與 GitHub issue，擴大可使用的開發脈絡。
- 將重複的處理流程寫成 prompt，可以讓 issue 修正與 Pull Request 工作更容易重複執行。
- 透過版本控制、檢查點與驗證步驟，可以更有系統地檢查 AI 協作產出的結果。
