import { useState } from "react";

const INITIAL_ENTRIES = [
  {
    id: 1,
    nickname: "피카츄",
    message: "멋진 방명록이네요! 잘 만들었어요 👍",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: 2,
    nickname: "꼬부기",
    message: "방문하고 갑니다~ 앞으로도 잘 부탁드려요!",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
];

function formatDate(date) {
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function Avatar({ nickname }) {
  const colors = [
    "bg-violet-100 text-violet-700",
    "bg-teal-100 text-teal-700",
    "bg-rose-100 text-rose-700",
    "bg-sky-100 text-sky-700",
    "bg-amber-100 text-amber-700",
  ];
  const idx = nickname.charCodeAt(0) % colors.length;
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 ${colors[idx]}`}
    >
      {nickname[0]}
    </div>
  );
}

function EntryCard({ entry }) {
  return (
    <div className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
      <Avatar nickname={entry.nickname} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-medium text-sm text-gray-900">{entry.nickname}</span>
          <span className="text-xs text-gray-400">{formatDate(entry.createdAt)}</span>
        </div>
        <p className="mt-1 text-sm text-gray-700 leading-relaxed break-words">
          {entry.message}
        </p>
      </div>
    </div>
  );
}

export default function GuestBook() {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);


  function handleSubmit() {
    if (!nickname.trim() || !message.trim()) {
      setError("닉네임과 메시지를 모두 입력해주세요.");
      return;
    }
    if (nickname.trim().length > 20) {
      setError("닉네임은 20자 이내로 입력해주세요.");
      return;
    }
    if (message.trim().length > 100) {
      setError("메시지는 100자 이내로 입력해주세요.");
      return;
    }

    setEntries((prev) => [
      {
        id: Date.now(),
        nickname: nickname.trim(),
        message: message.trim(),
        createdAt: new Date(),
      },
      ...prev,
    ]);
    setNickname("");
    setMessage("");
    setError("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">방명록</h1>
          <p className="text-sm text-gray-500">
            방문해 주셔서 감사합니다. 한 마디 남겨주세요!
          </p>
        </div>

        {/* 입력 폼 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm">
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => { setNickname(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              placeholder="닉네임을 입력하세요"
              maxLength={20}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition placeholder-gray-300 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              메시지
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => { setMessage(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              placeholder="한 줄 메시지를 남겨주세요"
              maxLength={100}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition placeholder-gray-300 text-gray-900"
            />
            <div className="mt-1 text-right text-xs text-gray-300">
              {message.length} / 100
            </div>
          </div>

          {error && <p className="text-xs text-rose-500 mb-3">{error}</p>}

          <button
            onClick={handleSubmit}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
              submitted
                ? "bg-teal-500 text-white"
                : "bg-violet-600 hover:bg-violet-700 active:scale-95 text-white"
            }`}
          >
            {submitted ? "✓ 등록되었습니다!" : "방명록 남기기"}
          </button>
        </div>

        {/* 목록 헤더 */}
        <div className="mb-3">
          <span className="text-xs font-medium text-gray-400">
            전체 {entries.length}개
          </span>
        </div>

        {/* 방명록 목록 */}
        <div className="flex flex-col gap-2">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-sm text-gray-400">
              아직 방명록이 없어요. 첫 번째로 남겨보세요!
            </div>
          ) : (
            entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
          )}
        </div>
      </div>
    </div>
  );
}