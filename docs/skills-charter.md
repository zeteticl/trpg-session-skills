# Skills Charter

十二個 skill，各管一件事。本文是職責邊界的說明；短詞彙仍以 `CONTEXT.md` 為準。

Skills 1–12 均已提供 SKILL.md。Token 裁切等腳本不算 skill。

**每個 skill 結束時都必須引導「下一步」**（建議的 `/trpg-…` 指令＋一句原因）；skills **不會**自動串接。見 `docs/next-steps.md`。

文中的 **GM** 即本專案詞彙裡的 Keep（人類主持人）。

---

## 1. trpg-router — 門口的導引

GM 說明要求如「備團／收團／出圖」。Router 只負責聽懂屬於哪一類，把對話交給對的 skill。

它不建資料夾、不拆劇本、不寫摘要、不出站；自己改檔就代表越界。

---

## 2. trpg-campaign-setup — 先搭空房子

分析與翻譯之前，先幫新手建好整座空房子（暫用名 `starter-module`／`my-table` 一次建齊），用白話說明資料夾用途，**再**引導劇本。建完後先掃 vault 根目錄有無單一 PDF／DOCX，用「要用這份嗎？」一題確認；確認中只請 GM 回覆該題，不要同時推 analyze。劇本／PDF 一進來就**依劇本名自動改名**（空白改 `_`，中英緊貼插入 `_`，去掉 `《》`，可加數字／英文代號），不要用 kebab slug，也不要把內容留在暫用名底下。

不要一開始就追問一堆 ID。房子是空的：不拆節奏與結構、不翻譯、不寫 prompt。有正文（或 PDF 抽成 source）後**必須停住**，請 GM 執行 `/trpg-scenario-analyze`；skills 不會自動串接。

---

## 3. trpg-scenario-analyze — 拆成可跑的備團結構

GM 附上 Module 正文。Analyze 讀正文，寫出備團用的完整結構包，讓 GM 能依檔開團，而不是只留一堆散句。若尚無 `source/scenario.*.md`，**不要**自己抽 PDF／改名——導回 `/trpg-campaign-setup` 完成攝入後再跑。結束後優先建議 `/trpg-live-aid`（先訂今晚）；出圖 Prompt Pack 為替代路徑。

- 節奏與整體結構  
- 6W 要素  
- 劇本核心故事與結局  
- 劇本背景  
- 時間線與事件  
- 參考文章  
- 角色分析與角色介紹  
- 場景與地點介紹  
- GM 與玩家的遊戲提示  
- 線索  
- NPC  
- BGM（模組層：建議曲目／使用場合；不是某一晚的播放操作表）  
- 系統節點（如 CoC 理智／戰鬥）  
- 攻略表  
- 附錄與參考資料  
- 劇本特殊系統  

它回答的是「桌上怎麼推進」，不是「怎麼譯」或「長什麼樣」。**每一個可上桌條目都要標劇本頁碼**（`（劇本 p.N）`；無則 `p.?`，禁止瞎編）。不寫 Session Notes，不寫繪圖 Prompt Pack。只換語言用 localize；結構或正文理解變了，才再跑 analyze。

---

## 4. trpg-localize — 為自己的桌子翻譯

產出譯文與術語表，並提醒：個人備團、Archive 預設本桌，勿把受版權全文當公開成品。

不重畫節奏與線索網；譯完之後若對結構的理解變了，再讓 analyze 讀譯文。不出站。

---

## 5. trpg-handout-art — 只寫「怎麼畫」與「檔放哪」

依人物／場景／道具寫 Portrait、Backdrop、Handout 的 Prompt Pack 與路徑命名。MVP 不必真的呼叫繪圖 API。

裁 Token、選／排序 BGM、寫團錄網頁都不歸它；真出資源是後期 asset-generate，Token 是腳本。

---

## 6. trpg-live-aid — 開團 GM 眼前那張表

為即將或正在進行的 Session 整理 run sheet：BGM 何時切、Handout 何時揭示、場景何時換；**每一列標註劇本頁碼**，方便開團時翻書。給人主持用，不是 AI 守秘人：不代骰、不代扮 NPC。

這裡的開團表**只寫一份** `live-aid.md`（切場／BGM／handout 都用 MD 表格）；不要另建 yaml 操作單。BGM 是「今晚操作順序」；模組層曲目建議在 analyze 的 `prep/11-bgm.md`。團後交給 recap。

---

## 7. trpg-session-recap — 只根據紀錄寫這團

原料是 Session Notes（必要）與可選 Transcript。寫摘要、未解線索、hooks、Notes 裡有的 PC 變化；來源沒有的不能寫。

不編靜態站（publish）；不聽原始音訊（外置 STT 或後期 transcribe）。

---

## 8. trpg-archive-publish — 收團結果編成 Session Archive

假設 recap 與媒體路徑已好。組 Manifest、選 `players`／`public`、跑產生器得到可分享靜態站；Keep Appendix 不進玩家頁。

不重寫摘要、不開 bot。多團總站是後期 campaign-hub。

---

## 9. trpg-vault-tidy — 只整理位置

檔名亂、重複、INDEX 過期時搬移、改名、去重、刷新索引。不創作節奏結構、譯文、摘要；缺洞標出交給別的 skill。

---

## 10. trpg-session-transcribe — 整理外部逐字稿

不內建 Whisper。把外部 STT 收成約定 Transcript（說話者、掛到 Session）。玩家向團錄仍由 recap；網站仍由 publish。

---

## 11. trpg-asset-generate — Prompt 變成資源

在已有 Prompt Pack 且設好 image API 時，依 pack 產出資源檔並寫回約定路徑。不發明 prompt、不做 Token、不選 BGM。

---

## 12. trpg-campaign-hub — 多團總入口

多份 Session Archive 之後做角色頁與未解線索看板。單團出站永遠先 archive-publish（路由 `/sessions/<id>/`）；Hub 是升級總站（`/hub/`、`/pcs/<id>/`），不是替身。

---

## 產物所有權（防踩線）

| 產物 | 唯一寫入者 |
|------|------------|
| 空目錄／stub manifest | campaign-setup |
| 備團結構包（節奏、6W、故事、結局、背景、時間線、角色、場景、提示、線索、NPC、模組層 BGM、系統節點、攻略、附錄、特殊系統等） | scenario-analyze |
| 譯文／術語表 | localize |
| Prompt Pack 與資產路徑 stub | handout-art |
| 開團 run sheet（當晚 BGM／揭示／場景操作序） | live-aid |
| Transcript（整理後） | session-transcribe |
| 團摘要／未解線索／hooks | session-recap |
| Archive Manifest＋單團靜態站 | archive-publish |
| 多團 Hub 站 | campaign-hub |
| 僅搬檔／INDEX | vault-tidy |
| 依 Prompt Pack 寫出的資源檔 | asset-generate |
| Token PNG＋token.json | 腳本（非 skill） |
