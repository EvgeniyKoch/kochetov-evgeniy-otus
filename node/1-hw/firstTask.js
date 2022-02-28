const data = {
  name: 1,
  items: [
    {
      name: 2,
      items: [
        { name: 3 },
        {
          name: 4,
          items: [
            {
              name: 7,
              items: [{ name: 234 }],
            },
          ],
        },
      ],
    },
    {
      name: 5,
      items: [{ name: 6, items: [{ name: 234 }] }],
    },
  ],
};

const ident = (depth, tab = 2) => " ".repeat(depth * tab);

const dirParent = "├───";
const dirChild = "└───";

export const showTree = ({ name, items }) => {
  const iter = (list, isChild, str, count) => {
    const space = isChild ? `│${ident(count)}` : "";
    const dir = isChild ? dirChild : dirParent;

    if (!list) {
      return str;
    }

    return list.reduce((acc, item) => {
      const line = `${acc}${space}${dir}${item.name}\n`;
      const valueIdent = isChild ? count + 1 : 1;

      return iter(item.items, true , line, valueIdent);
    }, str);
  };

  return iter(items, false, `${name}\n`, 1);
};

