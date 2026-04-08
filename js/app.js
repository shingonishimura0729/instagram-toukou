(() => {
  'use strict';

  const STORAGE_KEY = 'carport-checklist-state';

  const CHECKLIST_DATA = [
    {
      id: 'pre-check',
      title: '事前確認',
      icon: '\u{1F4CB}',
      items: [
        {
          id: 'pc-1',
          label: '建築確認申請の要否確認',
          help: '防火地域・準防火地域外で、10\u33A1以下の増築の場合は確認申請が不要な場合があります。該当する自治体の窓口で確認してください。'
        },
        {
          id: 'pc-2',
          label: '建ぺい率の確認',
          help: 'カーポートの柱から1m後退した部分が建築面積に算入されます。既存建物と合算して建ぺい率の上限を超えないか確認してください。'
        },
        {
          id: 'pc-3',
          label: '防火地域・準防火地域の確認',
          help: '防火地域では全ての建築物に確認申請が必要です。準防火地域では不燃材料の使用が求められる場合があります。都市計画図で確認してください。'
        },
        {
          id: 'pc-4',
          label: '用途地域の確認',
          help: '用途地域によって建築制限（建ぺい率・容積率等）が異なります。第一種低層住居専用地域では高さ制限にも注意が必要です。'
        },
        {
          id: 'pc-5',
          label: '地区計画・建築協定の確認',
          help: '地区計画や建築協定がある地域では、追加の制限（素材・色・高さ等）が設けられている場合があります。'
        }
      ]
    },
    {
      id: 'documents',
      title: '必要書類',
      icon: '\u{1F4C4}',
      items: [
        {
          id: 'doc-1',
          label: '確認申請書（第一面〜第六面）',
          help: '建築基準法施行規則に定める様式です。建築主事または指定確認検査機関に提出します。正本・副本の2部必要です。'
        },
        {
          id: 'doc-2',
          label: '建築計画概要書',
          help: '建築計画の概要を記載した書類です。確認申請書と合わせて提出します。'
        },
        {
          id: 'doc-3',
          label: '委任状',
          help: '建築士等の代理人が申請する場合に必要です。建築主の署名・押印が必要です。'
        },
        {
          id: 'doc-4',
          label: '付近見取図',
          help: '敷地の位置を示す地図です。敷地周辺の道路・建物等の状況がわかるように作成します。'
        },
        {
          id: 'doc-5',
          label: '配置図',
          help: '敷地内の建築物の配置を示す図面です。カーポートと既存建物の位置関係、敷地境界線からの距離等を記載します。縮尺1/100以上。'
        },
        {
          id: 'doc-6',
          label: '平面図',
          help: 'カーポートの平面形状・寸法を示す図面です。柱の位置、屋根の範囲等を記載します。縮尺1/100以上。'
        },
        {
          id: 'doc-7',
          label: '立面図（2面以上）',
          help: '正面と側面の2面以上の立面図が必要です。高さ・屋根勾配等を記載します。縮尺1/100以上。'
        },
        {
          id: 'doc-8',
          label: '構造計算書または仕様規定の確認',
          help: 'メーカー製カーポートの場合、構造計算書はメーカーから取得できます。積雪荷重・風圧力の確認も必要です。'
        },
        {
          id: 'doc-9',
          label: '建築工事届',
          help: '建築主事を経由して都道府県知事に届け出る書類です。工事着手前に提出が必要です。'
        }
      ]
    },
    {
      id: 'onsite',
      title: '現場確認',
      icon: '\u{1F4D0}',
      items: [
        {
          id: 'os-1',
          label: '敷地境界の確認',
          help: '境界杭や境界標の位置を確認し、隣地所有者とのトラブルを防ぎましょう。不明な場合は土地家屋調査士に相談してください。'
        },
        {
          id: 'os-2',
          label: '設置位置の確認・採寸',
          help: '車両サイズに合わせた設置位置を決め、実際に採寸してください。ドアの開閉スペースも考慮が必要です。'
        },
        {
          id: 'os-3',
          label: '既存建築物との離隔距離',
          help: '既存建物との距離を確認してください。民法上は境界から50cm以上の離隔が必要です（ただし慣習による例外あり）。'
        },
        {
          id: 'os-4',
          label: '道路からの後退距離（セットバック）',
          help: '前面道路が4m未満の場合、道路中心線から2m後退が必要です（2項道路）。セットバック部分には建築できません。'
        },
        {
          id: 'os-5',
          label: '地中埋設物の確認',
          help: '柱を立てる位置に水道管・ガス管・排水管等の埋設物がないか確認してください。'
        }
      ]
    },
    {
      id: 'construction',
      title: '施工準備',
      icon: '\u{1F527}',
      items: [
        {
          id: 'cp-1',
          label: 'メーカー・製品の選定',
          help: '積雪量・風速など地域の気象条件に合った製品を選びましょう。主要メーカー：LIXIL、YKK AP、三協アルミ等。'
        },
        {
          id: 'cp-2',
          label: '見積もりの取得・比較',
          help: '複数の施工業者から見積もりを取得し、施工費・材料費・諸経費を比較検討してください。'
        },
        {
          id: 'cp-3',
          label: '工事日程の調整',
          help: '確認済証の交付後に着工してください。工事期間は通常1〜2日程度です。近隣への事前挨拶もお忘れなく。'
        },
        {
          id: 'cp-4',
          label: '近隣への事前説明',
          help: '工事車両の出入りや騒音について、事前に近隣住民へ説明しておくとトラブル防止になります。'
        }
      ]
    }
  ];

  let checkedItems = new Set();

  function loadState() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data && Array.isArray(data.checked)) {
        checkedItems = new Set(data.checked);
      }
    } catch {
      checkedItems = new Set();
    }
  }

  function saveState() {
    const data = {
      version: 1,
      checked: Array.from(checkedItems),
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    updateLastUpdated(data.lastUpdated);
  }

  function getTotalItems() {
    return CHECKLIST_DATA.reduce((sum, cat) => sum + cat.items.length, 0);
  }

  function getCategoryProgress(categoryId) {
    const cat = CHECKLIST_DATA.find((c) => c.id === categoryId);
    if (!cat) return { done: 0, total: 0 };
    const done = cat.items.filter((item) => checkedItems.has(item.id)).length;
    return { done, total: cat.items.length };
  }

  function updateProgress() {
    const total = getTotalItems();
    const done = checkedItems.size;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);

    const bar = document.querySelector('.progress-bar');
    const text = document.querySelector('.progress-text');
    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = '\u9032\u6357: ' + done + '/' + total + ' \u5B8C\u4E86 (' + pct + '%)';

    CHECKLIST_DATA.forEach((cat) => {
      const prog = getCategoryProgress(cat.id);
      const el = document.querySelector('[data-cat-progress="' + cat.id + '"]');
      if (el) {
        el.textContent = prog.done + '/' + prog.total;
        if (prog.done === prog.total) {
          el.style.color = '#16a34a';
          el.style.fontWeight = '700';
        } else {
          el.style.color = '';
          el.style.fontWeight = '';
        }
      }
    });
  }

  function updateLastUpdated(isoStr) {
    const el = document.getElementById('last-updated');
    if (!el) return;
    if (!isoStr) {
      el.textContent = '';
      return;
    }
    const d = new Date(isoStr);
    el.textContent = '\u6700\u7D42\u66F4\u65B0: ' +
      d.getFullYear() + '/' +
      String(d.getMonth() + 1).padStart(2, '0') + '/' +
      String(d.getDate()).padStart(2, '0') + ' ' +
      String(d.getHours()).padStart(2, '0') + ':' +
      String(d.getMinutes()).padStart(2, '0');
  }

  function renderChecklist() {
    const container = document.getElementById('checklist-container');
    if (!container) return;

    container.innerHTML = CHECKLIST_DATA.map((cat) => {
      const prog = getCategoryProgress(cat.id);
      const itemsHtml = cat.items.map((item) => {
        const isChecked = checkedItems.has(item.id);
        return '<div class="checklist-item' + (isChecked ? ' checked' : '') + '" data-id="' + item.id + '">' +
          '<input type="checkbox" id="' + item.id + '"' + (isChecked ? ' checked' : '') + ' aria-label="' + item.label + '">' +
          '<div class="item-content">' +
            '<label class="item-label" for="' + item.id + '">' + item.label + '</label>' +
            '<span class="item-help-toggle" data-help="' + item.id + '" role="button" aria-label="\u8A73\u7D30\u3092\u8868\u793A">?</span>' +
            '<div class="item-help" id="help-' + item.id + '">' + item.help + '</div>' +
          '</div>' +
        '</div>';
      }).join('');

      return '<details class="category" data-category="' + cat.id + '" open>' +
        '<summary class="category-header">' +
          '<span class="cat-left">' +
            '<span class="cat-icon">' + cat.icon + '</span>' +
            '<span>' + cat.title + '</span>' +
          '</span>' +
          '<span class="cat-progress" data-cat-progress="' + cat.id + '">' + prog.done + '/' + prog.total + '</span>' +
          '<span class="arrow">\u25BC</span>' +
        '</summary>' +
        '<div class="category-items">' + itemsHtml + '</div>' +
      '</details>';
    }).join('');
  }

  function handleCheckChange(itemId, isChecked) {
    if (isChecked) {
      checkedItems.add(itemId);
    } else {
      checkedItems.delete(itemId);
    }

    const el = document.querySelector('[data-id="' + itemId + '"]');
    if (el) {
      el.classList.toggle('checked', isChecked);
    }

    saveState();
    updateProgress();
  }

  function resetChecklist() {
    if (!confirm('\u30C1\u30A7\u30C3\u30AF\u30EA\u30B9\u30C8\u3092\u30EA\u30BB\u30C3\u30C8\u3057\u307E\u3059\u304B\uFF1F\n\u3059\u3079\u3066\u306E\u30C1\u30A7\u30C3\u30AF\u304C\u89E3\u9664\u3055\u308C\u307E\u3059\u3002')) {
      return;
    }
    checkedItems.clear();
    localStorage.removeItem(STORAGE_KEY);
    renderChecklist();
    updateProgress();
    updateLastUpdated(null);
  }

  function attachEvents() {
    const container = document.getElementById('checklist-container');
    if (!container) return;

    container.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        handleCheckChange(e.target.id, e.target.checked);
      }
    });

    container.addEventListener('click', (e) => {
      const toggle = e.target.closest('.item-help-toggle');
      if (toggle) {
        const helpId = toggle.getAttribute('data-help');
        const helpEl = document.getElementById('help-' + helpId);
        if (helpEl) {
          helpEl.classList.toggle('show');
          toggle.textContent = helpEl.classList.contains('show') ? '\u00D7' : '?';
        }
      }
    });

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetChecklist);
    }
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  function initApp() {
    loadState();
    renderChecklist();
    updateProgress();

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        updateLastUpdated(JSON.parse(saved).lastUpdated);
      } catch {}
    }

    attachEvents();
    registerServiceWorker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
