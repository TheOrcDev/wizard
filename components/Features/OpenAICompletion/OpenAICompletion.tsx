"use client";

import React, { useEffect, useState } from "react";
import { trpc } from "@/server/client";

import { enter } from "@/lib/events";

import { CompletionModel, Voice, VoiceModel } from "@/components/shared/types";

import { Button, Loading, Textarea } from "@/components";

const wizardPrompt = (prompt: string) => {
  return `Answer to me like you are a Wizard from some fantasy world. 
  
  All modern questions should be answered like Wizard can see in future.

  This is the question: ${prompt}
  
  Return the answer in nice html format, but don't change the design, just use paragraphs and lists if needed.`;
};

export default function OpenAICompletion() {
  const [prompt, setPrompt] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [aiVoice, setAiVoice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getCompletion = trpc.gpt.completion.useMutation();
  const voice = trpc.gpt.voice.useMutation();

  const handleChatGpt = async () => {
    try {
      setLoading(true);
      const completion = await getCompletion.mutateAsync({
        prompt: wizardPrompt(prompt),
        model: CompletionModel.GPT_3_5_TURBO,
      });
      const tts = await voice.mutateAsync({
        prompt: completion,
        model: VoiceModel.TTS_1,
        voice: Voice.ECHO,
      });
      setLoading(false);
      setAiResult(completion);
      setAiVoice(tts);
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl">
      <Textarea
        className="w-96 rounded-xl p-3"
        rows={4}
        value={prompt}
        placeholder="Ask me a question..."
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => enter(e, handleChatGpt)}
      ></Textarea>
      <Button variant={"outline"} onClick={handleChatGpt}>
        Ask
      </Button>
      {loading && <Loading />}
      {aiResult && (
        <div
          className="mt-5 p-20 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] dark:text-white"
          dangerouslySetInnerHTML={{ __html: aiResult }}
        />
      )}
      {aiVoice && (
        <audio controls>
          <source src={aiVoice} type={"audio/mpeg"} />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
