import { JSONSchemaType } from "ajv";

type CellData<T> = {
  top: number;
  left: number;
  width: number;
  height: number;
  text: T;
};

type Table0Data = [
  [
    CellData<"国内支払日">,
    CellData<"国内入出庫日">,
    CellData<"銘柄コード">,
    CellData<"銘 柄 名">,
    CellData<"">,
    CellData<"">,
    CellData<"">
  ],
  [
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<"">,
    CellData<"">,
    CellData<"">
  ],
  [
    CellData<"現地基準日">,
    CellData<"権利の内容">,
    CellData<"取引通貨">,
    CellData<"権利対象数量">,
    CellData<"保有数:割当数">,
    CellData<"割当数量">,
    CellData<"取引単位数">
  ],
  [
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>
  ]
];

export type Table0 = {
  data: Table0Data;
};

const table0: JSONSchemaType<Table0> = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: [
        {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "国内支払日" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "国内入出庫日" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "銘柄コード" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "銘 柄 名" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
          ],
          minItems: 7,
          maxItems: 7,
        },
        {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
          ],
          minItems: 7,
          maxItems: 7,
        },
        {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "現地基準日" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "権利の内容" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "取引通貨" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "権利対象数量" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "保有数:割当数" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "割当数量" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "取引単位数" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
          ],
          minItems: 7,
          maxItems: 7,
        },
        {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
          ],
          minItems: 7,
          maxItems: 7,
        },
      ],
      minItems: 4,
      maxItems: 4,
    },
  },
  required: ["data"],
};

type Table1Data = [
  [
    CellData<"銘柄コード">,
    CellData<"銘 柄 名">,
    CellData<"入出庫\r区分">,
    CellData<"口座区分">,
    CellData<"権利処理の内訳">,
    CellData<"入出庫数量">,
    CellData<"備考">,
    CellData<"">
  ],
  [
    CellData<"">,
    CellData<"">,
    CellData<"">,
    CellData<"">,
    CellData<"権利対象数量">,
    CellData<"割当数量">,
    CellData<"">,
    CellData<"">
  ],
  [
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>,
    CellData<string>
  ]
];

export type Table1 = {
  data: Table1Data;
};

const table1: JSONSchemaType<Table1> = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: [
        {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "銘柄コード" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "銘 柄 名" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "入出庫\r区分" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "口座区分" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "権利処理の内訳" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "入出庫数量" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "備考" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
          ],
          minItems: 8,
          maxItems: 8,
        },
        {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "権利対象数量" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string", const: "割当数量" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", const: 0 },
                left: { type: "number", const: 0 },
                width: { type: "number", const: 0 },
                height: { type: "number", const: 0 },
                text: { type: "string", const: "" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
          ],
          minItems: 8,
          maxItems: 8,
        },
        {
          type: "array",
          items: [
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
            {
              type: "object",
              properties: {
                top: { type: "number", minimum: 0 },
                left: { type: "number", minimum: 0 },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 },
                text: { type: "string" },
              },
              required: ["top", "left", "width", "height", "text"],
              additionalProperties: false,
            },
          ],
          minItems: 8,
          maxItems: 8,
        },
      ],
      minItems: 3,
      maxItems: 3,
    },
  },
  required: ["data"],
};

export const schema = {
  table0,
  table1,
};
