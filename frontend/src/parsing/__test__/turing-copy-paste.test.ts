import { parse } from "parsing/turing-copy-paste";

test("A518FRM", () => {
  expect(
    parse(
      `op #A51 8FR M Share Get Criteria and Verification cards in the box. A 1 652 B 7 405 C 12 616 D 15 331 E 16 505 Back to Homepage`
    )
  ).toStrictEqual({
    ind: [1, 7, 12, 15, 16],
    crypt: [652, 405, 616, 331, 505],
    color: 2,
    m: 0,
    code: "A518FRM",
  });
});

test("A4BL4O", () => {
  expect(
    parse(
      `op #A4B L4O Share Get Criteria and Verification cards in the box. A 5 578 B 10 376 C 11 566 D 17 618 Back to Homepage`
    )
  ).toStrictEqual({
    ind: [5, 10, 11, 17],
    crypt: [578, 376, 566, 618],
    color: 0,
    m: 0,
    code: "A4BL4O",
  });
});

test("B51EHF9 firefox", () => {
  expect(
    parse(
      `logoTMSolo/Co-op#B51 EHF 9 ShareGet Criteria and Verification cards in the box.a2587b12319c17496d21523e22536Back to Homepage`
    )
  ).toStrictEqual({
    ind: [2, 12, 17, 21, 22],
    crypt: [587, 319, 496, 523, 536],
    color: 1,
    m: 0,
    code: "B51EHF9",
  });
});

test("A4BL4O uppercase", () => {
  expect(
    parse(
      `op #A4B L4O Share Get Criteria and Verification cards in the box. A 5 578 B 10 376 C 11 566 D 17 618 Back to Homepage`.toUpperCase()
    )
  ).toStrictEqual({
    ind: [5, 10, 11, 17],
    crypt: [578, 376, 566, 618],
    color: 0,
    m: 0,
    code: "A4BL4O",
  });
});

test("C65 6FF P", () => {
  expect(
    parse(
      `op #C65 6FF P Share Get Criteria and Verification cards in the box. A 5 252 B 22 536 C 24 658 D 27 213 E 33 613 F 48 289 Back to Homepage`
    )
  ).toStrictEqual({
    ind: [5, 22, 24, 27, 33, 48],
    crypt: [252, 536, 658, 213, 613, 289],
    color: 1,
    m: 0,
    code: "C656FFP",
  });
});

test("E52 NBU A", () => {
  expect(
    parse(
      `rulebook page 3 #E52 NBU A Share  Get Criteria and Verification cards in the box. a 1721 499 b 2214 296 c 2319 237 d 210 378 e 1815 594 Back t`
    )
  ).toStrictEqual({
    ind: [17, 22, 23, 2, 18],
    fake: [21, 14, 19, 10, 15],
    crypt: [499, 296, 237, 378, 594],
    color: 2,
    m: 1,
    code: "E52NBUA",
  });
});

test("H5K M7S", () => {
  expect(
    parse(
      `Nightmare Mode: see rulebook page 3 #H5K M7S Share Get Criteria and Verification cards in the box. 212171922 A 485 B 537 C 315 D 413 E 614 Back to Homepage`
    )
  ).toStrictEqual({
    ind: [2, 12, 17, 19, 22],
    crypt: [485, 537, 315, 413, 614],
    color: 0,
    m: 2,
    code: "H5KM7S",
  });
});

test("all languages work", () => {
  const problems = [
    `logoTM Solo/Co-op #B5V VGO Share Get Criteria and Verification cards in the box. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Back to Homepage`,
    `logoTM Solo / Coop #B5V VGO Partager Récupérer les cartes Critères et Vérification dans la boîte. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Retour à la page d'accueil`,
    `logoTM #B5V VGO 分享 从游戏盒中拿取标准卡牌和验证卡牌。 A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 返回主页`,
    `logoTM #B5V VGO 分享 從遊戲盒中拿取準則卡和驗證卡。 A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 返回主畫面`,
    `logoTM #B5V VGO 공유하기 다음 검증기 카드와 테스트 카드를 준비하세요. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 첫 화면으로 돌아가기`,
    `logoTM #B5V VGO Teilen Nimm folgende Prüf- und Ergebniskarten aus der Schachtel: A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Zurück zur Startseite`,
    `logoTM #B5V VGO MEGOSZTÁS Keresd ki a feltétel- és igazolókártyákat a dobozból. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Vissza a főoldalra`,
    `logoTM #B5V VGO Condividi Prendi le carte criterio e le carte verifica indicate. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Torna alla Homepage`,
    `logoTM #B5V VGO Comparte Toma las siguientes cartas de Criterio y de Verificación. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Volver a la página principal`,
    `logoTM #B5V VGO ΜΟΙΡΑΣΤΕΙΤΕ Βρείτε κάρτες Κριτηρίων και Ελεγκτών στο κουτί. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Πίσω στην Αρχική Σελίδα`,
    `logoTM #B5V VGO Compartilhar Pegue as cartas de Critério e Verificação na caixa. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Voltar para Home`,
    `logoTM #B5V VGO シェアする 下記の要件カードと判定カードを 用意してください。 A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 トップに戻る`,
    `logoTM #B5V VGO PODZIEL SIĘ Weź karty kryteriów i weryfikacji z pudełka. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Wróć do strony głównej`,
    `logoTM #B5V VGO DELEN Pak de criterium- en controlekaarten uit de doos. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Terug naar homepage`,
    `logoTM #B5V VGO ПОДІЛИТИСЯ Візьміть карти критеріїв та верифікації з коробки. A 4 447 B 14 596 C 18 220 D 19 233 E 22 485 Повернутися на головну`,
  ];
  for (const problem of problems) {
    expect(parse(problem)).toStrictEqual({
      ind: [4, 14, 18, 19, 22],
      crypt: [447, 596, 220, 233, 485],
      m: 0,
      color: 0,
      code: "B5VVGO",
    });
  }
});
