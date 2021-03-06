# [Mini Game] Drive away bugs: 벌레를 쫓아라

당근 농장에서 주어진 10초동안 20마리의 벌레를 잡는 게임입니다.
<br/>당근을 뽑아버리면 게임은 즉시 종료됩니다.

<br/>

[Click here to try](https://seoyun0208.github.io/drive_away_bugs/)

<br/>

## Wide Screen (PC 화면)

![wide](https://github.com/Seoyun0208/drive_away_bugs/blob/master/demo/wide.png)

<br/>

## Narrow Screen (모바일 화면)

![Narrow](https://github.com/Seoyun0208/drive_away_bugs/blob/master/demo/narrow.png)

<br/>

## 게임의 특성

-   PC 화면을 기준으로 만들었지만, 모바일에서 사용하는 데에도 불편함이 없도록 반응형으로 디자인되었습니다.
    <br/>- 브라우저 창의 크기 변경 시 창 크기에 맞는 아이템 재배치를 위해 게임이 다시 시작됩니다.
    <br/>- 창의 너비가 일정 수준 이하로 작아지는 아이템 크기와 함께 전체적으로 위치 및 사이즈 조정이 이루어집니다.

<br/>

-   게임 재생/정지, 아이템 클릭 시 게임에 재미를 더하기 위해 소리를 추가하였습니다.

<br/>

-   상단 중앙의 타이머 표시 기능을 통해 남은 제한 시간을 보며 긴박하게 게임을 할 수 있습니다.

<br/>

-   상단 우측의 남은 벌레 수 표시 기능을 통해 잡아야 하는 벌레 수를 확인할 수 있습니다.

<br/>

## 게임의 추가 계획

-   목숨 기능
    <br/>: 당근에 벌레가 완전히 혹은 반 이상이 가려져서 게임에서 이길 수 없는 경우가 꽤 많았습니다.
    <br/>: 그렇다고 당근에 벌레가 가리지 않게 하니 게임의 재미가 반감되었습니다.
    <br/>: 따라서, 1~2개의 목숨을 부여하여 목숨을 깎더라도 당근을 치우고 벌레를 잡을 수 있도록 만들어 볼 계획입니다.
    <br/>: 남은 목숨도 예쁘게 화면에 표시해주고, 당근을 클릭할 경우 점수를 까거나 패널티로 벌레를 몇마리 추가할 예정입니다.

<br/>

-   독촉 기능
    <br/>: 이 게임은 당근농장 주인이 시간 없으니까 10초만 농장을 맡겨 벌레를 잡는 컨셉입니다.
    <br/>: 바쁜 사람은 꼭 시간을 다 채우지 않더라도 독촉을 하기 마련인 실생활을 반영하여 타이머는 계속 가는데 랜덤으로 중간중간 독촉 모달창을 띄워 게임의 긴장감을 높여볼 예정입니다.

<br/>

## 게임을 만들어본 소감

-   JavaScript 와 DOM 에 대해 한 번 더 짚고 넘어갈 수 있는 계기가 되었습니다.
-   처음 게임을 만드는 것이라 게임의 동작에만 집중하다보니 깔끔하게 코드를 작성하지 못한 점이 아쉬웠습니다.
-   앞으로는 미리 기획을 해보며 중복되는 코드가 발생하지 않도록 어떻게 함수를 작성해야할지 고민해봐야겠다는 생각이 들었습니다.
-   게임을 완성한 후 모듈화하여 리팩토링하고자 하였으나, 아직 의욕에 비해 실력이 모자란 것을 많이 느꼈습니다. JavaScript 객체지향에 대해 조금 더 공부하고 다시 시도해볼 예정입니다.
