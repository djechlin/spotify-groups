"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import _ from 'lodash';

type SIZE = 4;

const COLORS = [ "pastel-pink", "pastel-green", "pastel-yellow", "pastel-blue"];

export type ConfigItem = {
    title: string,
    description: string,
    category: string
}

export type ConfigCategory = {
    items: ConfigItem[] & {length: SIZE},
    name: string
}

// order should match playlist
export type Config = {
  items: ConfigItem[];
}

type GridItem = {
  title: string,
  description: string,
  category: string,
  color: string,
  clicked: boolean,
  hinted: boolean,
  solved: boolean,
  index: number
}

function initGridItem(configItem: ConfigItem, index: number, color: string): GridItem {
  return {
    title: configItem.title,
    description: configItem.description,
    category: configItem.category,
    color,
    clicked: false,
    hinted: false,
    solved: false,
    index
  };
}

type SolvedCategory = {
  name: string,
  color: string
}

export default function GroupPuzzle({ config } : { config: Config }) {
  const [items, setItems] = useState<GridItem[]>([])
  const [guesses, setGuesses] = useState<number>(0);
  
  // do not like this factorization
  const [solvedCategories, setSolvedCategories] = useState<SolvedCategory[]>([]);

    useEffect(() => {
      const categories = _.uniq(config.items.map(item => item.category));
      const categoryToColor = _.zipObject(categories, COLORS);
        const allItems = config.items.map((item, i) => initGridItem(item, i, categoryToColor[item.category]));
        setItems(allItems);
    }, [config]);

    const howManyAreClicked = () => {
      return items.filter(item => item.clicked).length;
    }

    const handleClick = (item: GridItem) => {
      if (item.solved) {
        return;
      }
      if (howManyAreClicked() === 4 && !item.clicked) {
        return;
      }
      const newItem = {...item, clicked: !item.clicked};
      const newItems = [...items];
      newItems[newItem.index] = newItem;
      setItems(newItems);
    }

    const checkIsCategory = () => {
      if (howManyAreClicked() !== 4) {
        return;
      }
      const clickedItems = items.filter(item => item.clicked);
      const clickedCategories = clickedItems.map(item => item.category);
      if (_(clickedCategories).uniq().size() !== 1) {
        setGuesses(guesses+1);
        setItems(items.map(item => ({...item, clicked: false})));
        return;
      }
      const newItems = [...items];
      clickedItems.forEach(item => {
        newItems[item.index].solved = true;
        newItems[item.index].clicked = false;
      });
      const newSolvedCategories = [...solvedCategories, {name: clickedItems[0].category, color: clickedItems[0].color}];
      setItems(newItems);
      setSolvedCategories(newSolvedCategories);
    }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Find the 4 groups of songs</h1>
      <div className="flex gap-4">
        <div className="flex-grow">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {items.map((item) => (
              <Card
              key={item.index}
              className={`cursor-pointer transition-all duration-300 ${
                item.solved ? `bg-${item.color}` : 'bg-gray-100'
              } ${item.clicked ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleClick(item)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-gray-600 truncate">{item.description}</p>
              </CardContent>
            </Card>
            ))}
          </div>
          <div className="flex justify-between items-center mb-4">
            <Button onClick={checkIsCategory} disabled={items.filter(item => item.clicked).length !== 4}>
              Submit
            </Button>
            {/* <Button onClick={useHint} disabled={gameWon}>
              Use Hint
            </Button> */}
            <div>Extra Guesses: {guesses}</div>
            {/* <div>Hints Used: {hintsUsed}</div> */}
          </div>
          <div>
            {solvedCategories.map((category, i) => (
              <div key={i} className={`text-2xl bg-${category.color}`}>{category.name}</div>
            ))}
          </div>
          {items.every(item => item.solved) && <div className="text-2xl font-bold text-purple-500">Congratulations! You&apos;ve won!</div>}
        </div>
      </div>
    </div>
  )
}

