"use client";

import { useState, useEffect } from "react";
import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (cookieName: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${cookieName}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
      return null;
    };

    let storedName = getCookie("username");

    if (!storedName) {
      storedName = prompt("Введите ваше имя:");
      if (storedName) {
        document.cookie = `username=${storedName}; path=/; max-age=31536000`;
      }
    }

    setName(storedName);
  }, []);

  const sendMessage = () => {
    if (input.trim() && name) {
      setMessages([...messages, `${name}: ${input}`]);
      setInput("");
    }
  };

  const changeName = () => {
    const newName = prompt("Введите новый ник");
    if (newName) {
      document.cookie = `username=${newName}; path=/; max-age=31536000`;
      setName(newName);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[500px] p-6 shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <p className="text-xl font-bold">Чат</p>
          <div>
            <p className="inline text-lg">
              Имя: <span className="font-bold">{name || "Неизвестный"}</span>
            </p>
            <Button
              size="sm"
              className="ml-3"
              onClick={changeName}
            >
              Сменить имя
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="h-80 overflow-y-auto border rounded-lg p-4 bg-gray-100">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <p key={index} className="p-2 bg-white rounded-lg mb-2 shadow">
                  {msg}
                </p>
              ))
            ) : (
              <p className="text-gray-400 text-center">Нет сообщений</p>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Введите сообщение..."
                disabled={!name}
            />
            <Button
              color="primary"
              onClick={sendMessage}
              disabled={!name}
            >
              Отправить
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
