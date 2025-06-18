import React, { useState, useEffect } from 'react';
import { Play, Plus, Shuffle, Users, Home } from 'lucide-react';

// Ícone de copo de cerveja personalizado
const BeerGlass = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* Copo principal */}
    <path d="M6 4h8c.5 0 1 .5 1 1v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V5c0-.5.5-1 1-1z" 
          fill="currentColor" opacity="0.9"/>
    {/* Cerveja dentro do copo */}
    <path d="M6.5 7h7v11c0 .5-.4 1-1 1H7.5c-.6 0-1-.5-1-1V7z" 
          fill="currentColor" opacity="0.7"/>
    {/* Espuma */}
    <ellipse cx="10" cy="5.5" rx="3.5" ry="1.2" fill="currentColor" opacity="0.4"/>
    <ellipse cx="10" cy="4.8" rx="3" ry="0.8" fill="currentColor" opacity="0.6"/>
    {/* Alça do copo */}
    <path d="M15 7v6c0 1.1.9 2 2 2s2-.9 2-2V9c0-1.1-.9-2-2-2h-2z" 
          fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
    {/* Detalhes de brilho */}
    <rect x="7" y="8" width="1" height="8" rx="0.5" fill="currentColor" opacity="0.3"/>
  </svg>
);

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [gameQuestions, setGameQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const perguntasPadrao = [
    "Se você já ficou com alguém 10 anos mais velho que você... BEBA!",
    "Se você já ficou com alguém do mesmo gênero... BEBA!",
    "Se você já se apaixonou por um amigo ou amiga... BEBA!",
    "Se você já beijou alguém no primeiro encontro... BEBA!",
    "Se você já mentiu sobre sua idade para ficar com alguém... BEBA!",
    "Se você já teve um caso com alguém comprometido... BEBA!",
    "Se você já fingiu um orgasmo... BEBA!",
    "Se você já transou em local público... BEBA!",
    "Se você já enviou nudes para alguém... BEBA!",
    "Se você já teve uma aventura de uma noite... BEBA!",
    "Se você já ficou com dois amigos no mesmo dia... BEBA!",
    "Se você já teve crush em professor(a)... BEBA!",
    "Se você já transou no carro... BEBA!",
    "Se você já teve um relacionamento à distância... BEBA!",
    "Se você já traiu alguém... BEBA!",
    "Se você já foi traído(a)... BEBA!",
    "Se você já simulou estar doente para evitar transar... BEBA!",
    "Se você já transou em casa de amigos... BEBA!",
    "Se você já teve fantasias com celebridades... BEBA!",
    "Se você já usou aplicativo de relacionamento... BEBA!",
    "Se você já ficou com alguém só pela aparência... BEBA!",
    "Se você já teve relacionamento secreto... BEBA!",
    "Se você já transou bêbado(a) e não lembrou... BEBA!",
    "Se você já teve ciúmes de ex do(a) parceiro(a)... BEBA!",
    "Se você já stalkeou ex nas redes sociais... BEBA!",
    "Se você já voltou com ex mais de uma vez... BEBA!",
    "Se você já transou no trabalho... BEBA!",
    "Se você já teve fantasias com amigo(a) do(a) parceiro(a)... BEBA!",
    "Se você já mentiu sobre o número de parceiros... BEBA!",
    "Se você já ficou com alguém por vingança... BEBA!",
    "Se você já teve relacionamento com diferença de idade maior que 15 anos... BEBA!",
    "Se você já transou na casa dos pais... BEBA!",
    "Se você já teve encontro marcado pelo Tinder... BEBA!",
    "Se você já ficou com colega de trabalho... BEBA!",
    "Se você já teve crush platônico... BEBA!",
    "Se você já transou em hotel... BEBA!",
    "Se você já teve relacionamento de três meses ou menos... BEBA!",
    "Se você já ficou com alguém comprometido... BEBA!",
    "Se você já teve aventura em viagem... BEBA!",
    "Se você já transou em festa... BEBA!",
    "Se você já teve relacionamento com alguém famoso... BEBA!",
    "Se você já ficou com primo(a) de segundo grau... BEBA!",
    "Se você já transou em piscina ou mar... BEBA!",
    "Se você já teve crush no chefe... BEBA!",
    "Se você já ficou com delivery ou Uber... BEBA!",
    "Se você já teve relacionamento aberto... BEBA!",
    "Se você já transou em motel... BEBA!",
    "Se você já teve fantasia com personagem de filme/série... BEBA!",
    "Se você já ficou com alguém por dinheiro... BEBA!",
    "Se você já teve crush em médico(a)... BEBA!",
    "Se você já transou na academia... BEBA!",
    "Se você já ficou com alguém só para fazer ciúmes... BEBA!",
    "Se você já teve relacionamento com vizinho(a)... BEBA!",
    "Se você já transou em avião... BEBA!",
    "Se você já teve crush em personal trainer... BEBA!",
    "Se você já ficou com bartender... BEBA!",
    "Se você já teve relacionamento com ex-amigo(a)... BEBA!",
    "Se você já transou em praia... BEBA!",
    "Se você já teve fantasia com sogro(a)... BEBA!",
    "Se você já ficou com alguém casado... BEBA!",
    "Se você já teve crush em massagista... BEBA!",
    "Se você já transou em banheiro público... BEBA!",
    "Se você já teve relacionamento com diferença de classe social... BEBA!",
    "Se você já ficou com garçom/garçonete... BEBA!",
    "Se você já teve crush em dentista... BEBA!",
    "Se você já transou em escritório... BEBA!",
    "Se você já teve fantasia com cunhado(a)... BEBA!",
    "Se você já ficou com alguém da família do ex... BEBA!",
    "Se você já teve relacionamento com músico... BEBA!",
    "Se você já transou em biblioteca... BEBA!",
    "Se você já teve crush em tatuador(a)... BEBA!",
    "Se você já ficou com policial... BEBA!",
    "Se você já teve relacionamento com atleta... BEBA!",
    "Se você já transou em elevador... BEBA!",
    "Se você já teve fantasia com padrasto/madrasta... BEBA!",
    "Se você já ficou com bombeiro... BEBA!",
    "Se você já teve crush em cabeleireiro(a)... BEBA!",
    "Se você já transou em parque... BEBA!",
    "Se você já teve relacionamento com modelo... BEBA!",
    "Se você já ficou com piloto... BEBA!",
    "Se você já teve crush em veterinário(a)... BEBA!",
    "Se você já transou em cinema... BEBA!",
    "Se você já teve fantasia com tio(a)... BEBA!",
    "Se você já ficou com chef de cozinha... BEBA!",
    "Se você já teve relacionamento com artista... BEBA!",
    "Se você já transou em loja... BEBA!",
    "Se você já teve crush em farmacêutico(a)... BEBA!",
    "Se você já ficou com arquiteto(a)... BEBA!",
    "Se você já teve relacionamento com advogado(a)... BEBA!",
    "Se você já transou em clube... BEBA!",
    "Se você já teve fantasia com patrão/patroa... BEBA!",
    "Se você já ficou com médico(a)... BEBA!",
    "Se você já teve crush em professor(a) de academia... BEBA!",
    "Se você já transou em consultório... BEBA!",
    "Se você já teve relacionamento com engenheiro(a)... BEBA!",
    "Se você já ficou com designer... BEBA!",
    "Se você já teve crush em recepcionista... BEBA!",
    "Se você já transou em sala de aula... BEBA!",
    "Se você já teve fantasia com vizinho(a)... BEBA!",
    "Se você já ficou com jornalista... BEBA!",
    "Se você já teve relacionamento com programador(a)... BEBA!",
    "Se você já transou em estacionamento... BEBA!",
    "Se você já teve crush em segurança... BEBA!",
    "Se você já ficou com psicólogo(a)... BEBA!",
    "Se você já teve relacionamento com influencer... BEBA!",
    "Se você já transou em restaurante... BEBA!",
    "Se você já teve fantasia com amigo(a) dos pais... BEBA!",
    "Se você já ficou com contador(a)... BEBA!",
    "Se você já teve crush em nutricionista... BEBA!",
    "Se você já transou em shopping... BEBA!",
    "Se você já teve relacionamento com personal stylist... BEBA!",
    "Se você já dormiu com alguém só para ter onde ficar... BEBA!",
    "Se você já mentiu sobre estar solteiro(a)... BEBA!",
    "Se você já teve um relacionamento de interesse... BEBA!",
    "Se você já ficou com alguém para conseguir um favor... BEBA!",
    "Se você já transou em dia de trabalho durante o expediente... BEBA!",
    "Se você já teve um encontro que virou pesadelo... BEBA!",
    "Se você já simulou prazer para acabar logo... BEBA!",
    "Se você já acordou sem lembrar com quem estava... BEBA!",
    "Se você já usou mentiras criativas no Tinder... BEBA!",
    "Se você já teve medo durante uma relação sexual... BEBA!",
    "Se você já transou em casa abandonada ou lugar assombrado... BEBA!",
    "Se você já teve que se esconder de alguém após uma ficada... BEBA!",
    "Se você já teve um relacionamento apenas virtual... BEBA!",
    "Se você já mandou nudes para a pessoa errada... BEBA!",
    "Se você já teve uma paixão obsessiva por alguém... BEBA!",
    "Se você já transou no primeiro dia que conheceu a pessoa... BEBA!",
    "Se você já teve que inventar desculpa para sair de um encontro... BEBA!",
    "Se você já ficou com alguém muito mais novo que você... BEBA!",
    "Se você já teve relacionamento por pena da pessoa... BEBA!",
    "Se você já transou em transporte público... BEBA!",
    "Se você já teve que pagar a conta do encontro sozinho(a)... BEBA!",
    "Se você já fingiu não conhecer alguém com quem já ficou... BEBA!",
    "Se você já teve crush em personagem de desenho animado... BEBA!",
    "Se você já transou em cemitério... BEBA!",
    "Se você já teve relacionamento com alguém da mesma turma/escola... BEBA!",
    "Se você já foi pego(a) pelos pais em situação íntima... BEBA!",
    "Se você já teve que escalar janela para escapar... BEBA!",
    "Se você já transou em casa de parentes... BEBA!",
    "Se você já teve relacionamento com alguém que odiava... BEBA!",
    "Se você já mandou áudio hot pelo WhatsApp... BEBA!",
    "Se você já teve que bloquear alguém por insistência... BEBA!",
    "Se você já transou em local de trabalho de outra pessoa... BEBA!",
    "Se você já teve crush em personagem de novela... BEBA!",
    "Se você já ficou com alguém só para não ficar sozinho(a)... BEBA!",
    "Se você já teve que mentir sobre onde estava a noite toda... BEBA!",
    "Se você já transou em barraca de camping... BEBA!",
    "Se você já teve relacionamento que seus amigos odiavam... BEBA!",
    "Se você já ficou com alguém por desafio ou aposta... BEBA!",
    "Se você já teve que fingir que estava dormindo... BEBA!",
    "Se você já transou em lugar que poderia ser preso(a)... BEBA!",
    "Se você já teve crush em dublador(a) de filme... BEBA!",
    "Se você já ficou com duas pessoas em festas no mesmo fim de semana... BEBA!",
    "Se você já teve relacionamento que escondeu da família... BEBA!",
    "Se você já transou em horário que deveria estar trabalhando... BEBA!",
    "Se você já teve que excluir fotos comprometedoras... BEBA!",
    "Se você já mentiu sobre ser virgem... BEBA!",
    "Se você já teve crush em streamer ou YouTuber... BEBA!",
    "Se você já transou em local religioso... BEBA!",
    "Se você já teve relacionamento apenas por interesse físico... BEBA!",
    "Se você já ficou com alguém para esquecer outra pessoa... BEBA!"
  ];

  useEffect(() => {
    setGameQuestions([...perguntasPadrao, ...customQuestions]);
  }, [customQuestions]);

  // Carregar perguntas personalizadas do localStorage
  useEffect(() => {
    const savedQuestions = localStorage.getItem('bebase-custom-questions');
    if (savedQuestions) {
      setCustomQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // Salvar perguntas personalizadas no localStorage
  useEffect(() => {
    localStorage.setItem('bebase-custom-questions', JSON.stringify(customQuestions));
  }, [customQuestions]);

  const shuffleQuestions = () => {
    const shuffled = [...gameQuestions].sort(() => Math.random() - 0.5);
    setGameQuestions(shuffled);
    setCurrentQuestionIndex(0);
  };

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * gameQuestions.length);
    setCurrentQuestionIndex(randomIndex);
  };

  const addCustomQuestion = () => {
    if (newQuestion.trim()) {
      const formattedQuestion = newQuestion.startsWith('Se você já') ? 
        `${newQuestion}... BEBA!` : 
        `Se você já ${newQuestion}... BEBA!`;
      setCustomQuestions([...customQuestions, formattedQuestion]);
      setNewQuestion('');
    }
  };

  const startGame = () => {
    shuffleQuestions();
    setGameStarted(true);
    setCurrentScreen('game');
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="bg-white rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4 shadow-lg">
            <BeerGlass className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Beba-se</h1>
          <p className="text-green-100 text-lg">Para casais e amigos corajosos</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={startGame}
            className="w-full bg-white text-green-600 py-4 px-6 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 shadow-lg hover:bg-green-50 transition-colors"
          >
            <Play className="w-6 h-6" />
            <span>Começar Jogo</span>
          </button>

          <button
            onClick={() => setCurrentScreen('custom')}
            className="w-full bg-green-500 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:bg-green-400 transition-colors"
          >
            <Plus className="w-6 h-6" />
            <span>Criar Perguntas</span>
          </button>

          <button
            onClick={() => setCurrentScreen('rules')}
            className="w-full bg-green-500 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:bg-green-400 transition-colors"
          >
            <Users className="w-6 h-6" />
            <span>Como Jogar</span>
          </button>
        </div>

        <div className="mt-8 bg-white/20 rounded-2xl p-4 text-center">
          <p className="text-white text-sm">
            <strong>{perguntasPadrao.length + customQuestions.length}</strong> perguntas disponíveis
          </p>
          <p className="text-green-100 text-xs mt-1">
            {customQuestions.length} perguntas personalizadas
          </p>
        </div>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6 pt-4">
          <button
            onClick={() => {
              setCurrentScreen('home');
              setGameStarted(false);
            }}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
          >
            <Home className="w-6 h-6" />
          </button>
          <div className="text-white text-center">
            <p className="text-sm opacity-80">Pergunta</p>
            <p className="text-xl font-bold">{currentQuestionIndex + 1} / {gameQuestions.length}</p>
          </div>
          <button
            onClick={shuffleQuestions}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
          >
            <Shuffle className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6 min-h-[300px] flex items-center justify-center">
          <p className="text-gray-800 text-xl text-center leading-relaxed font-medium">
            {gameQuestions[currentQuestionIndex]}
          </p>
        </div>

        <button
          onClick={getRandomQuestion}
          className="w-full bg-white text-green-600 py-4 px-6 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 shadow-lg hover:bg-green-50 transition-colors"
        >
          <Shuffle className="w-6 h-6" />
          <span>Pergunta Aleatória</span>
        </button>

        <div className="mt-4 bg-white/20 rounded-2xl p-3 text-center">
          <p className="text-white text-sm">
            Clique para uma nova pergunta surpresa!
          </p>
        </div>
      </div>
    </div>
  );

  const renderCustom = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6 pt-4">
          <button
            onClick={() => setCurrentScreen('home')}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors mr-4"
          >
            <Home className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white">Criar Perguntas</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Nova Pergunta</h3>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ex: ficou com alguém no trabalho"
            className="w-full border-2 border-green-200 rounded-xl p-4 text-gray-800 resize-none focus:border-green-500 focus:outline-none"
            rows="3"
          />
          <p className="text-gray-500 text-sm mt-2 mb-4">
            Não precisa escrever "Se você já" no início
          </p>
          <button
            onClick={addCustomQuestion}
            disabled={!newQuestion.trim()}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-bold disabled:bg-gray-300 hover:bg-green-600 transition-colors"
          >
            Adicionar Pergunta
          </button>
        </div>

        {customQuestions.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Suas Perguntas ({customQuestions.length})
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {customQuestions.map((question, index) => (
                <div key={index} className="bg-green-50 p-3 rounded-xl">
                  <p className="text-gray-800 text-sm">{question}</p>
                  <button
                    onClick={() => {
                      const newCustomQuestions = customQuestions.filter((_, i) => i !== index);
                      setCustomQuestions(newCustomQuestions);
                    }}
                    className="text-red-500 text-xs mt-2 hover:text-red-700"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6 pt-4">
          <button
            onClick={() => setCurrentScreen('home')}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors mr-4"
          >
            <Home className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white">Como Jogar</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">📋 Regras Básicas</h3>
            <div className="space-y-3 text-gray-700">
              <p>• Cada jogador lê uma pergunta em voz alta</p>
              <p>• Quem já passou pela situação deve beber</p>
              <p>• Seja honesto - a diversão está na sinceridade!</p>
              <p>• Respeite os limites de todos</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">🍷 Alternativas</h3>
            <div className="space-y-3 text-gray-700">
              <p>• Substituir bebida por: água, suco, refrigerante</p>
              <p>• Fazer atividade: flexão, agachamento, dança</p>
              <p>• Contar uma história relacionada</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">⚠️ Importante</h3>
            <div className="space-y-3 text-gray-700">
              <p>• Beba com responsabilidade</p>
              <p>• Não dirija após consumir álcool</p>
              <p>• Pare se alguém se sentir desconfortável</p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <p className="text-green-800 text-center font-medium">
              Diversão garantida com 150+ perguntas picantes! 🔥
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentScreen === 'home' && renderHome()}
      {currentScreen === 'game' && renderGame()}
      {currentScreen === 'custom' && renderCustom()}
      {currentScreen === 'rules' && renderRules()}
    </div>
  );
};

export default App;