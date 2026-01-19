# PostDetail - Componente Reutilizável

Um componente flexível e reutilizável para exibir posts detalhados no app Lovele.

## 📋 Características

- ✅ Suporta múltiplos tipos de posts: `momento` e `recado`
- ✅ Suporta diferentes tipos de conteúdo: texto, imagens, vídeos, áudio
- ✅ Três variantes de layout: `card`, `fullscreen`, `modal`
- ✅ Animações fluidas (like com coração, escala de botões)
- ✅ Gerenciamento de estado interno
- ✅ Callbacks para ações do usuário
- ✅ Design responsivo

## 🎯 Props

```typescript
interface PostDetailProps {
  post: Post;                      // Dados do post
  onLike?: (postId: string) => void;      // Callback ao curtir
  onComment?: (postId: string) => void;   // Callback ao comentar
  onShare?: (postId: string) => void;     // Callback ao compartilhar
  onSave?: (postId: string) => void;      // Callback ao salvar
  showFullContent?: boolean;      // Mostrar conteúdo completo (padrão: true)
  variant?: 'card' | 'fullscreen' | 'modal';  // Tipo de layout (padrão: 'card')
}
```

## 📦 Tipos de Post

```typescript
// Estrutura completa de um post
interface Post {
  id: string;
  type: 'momento' | 'recado';
  user?: PostUser;                  // Para posts tipo 'momento'
  from?: PostUser;                  // Para posts tipo 'recado' (quem envia)
  to?: PostUser;                    // Para posts tipo 'recado' (quem recebe)
  content: PostContent;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
  expiresIn?: number;               // Apenas para momentos (em horas)
}

interface PostUser {
  id?: string;
  name: string;
  username: string;
  avatar: string;
  verified?: boolean;
}

interface PostContent {
  text?: string;
  image?: string;
  video?: string;
  audioUrl?: string;
  type: 'texto' | 'imagem' | 'video' | 'audio' | 'misto';
}
```

## 💡 Exemplos de Uso

### 1. Momento com Imagem (Variant: Card)

```tsx
import { PostDetail, Post } from '@/components/post';

const momentoPost: Post = {
  id: '1',
  type: 'momento',
  user: {
    name: 'Carolina Mendes',
    username: 'carolmends',
    avatar: 'https://i.pravatar.cc/150?img=5',
    verified: true,
  },
  content: {
    text: 'Às vezes precisamos apenas de um café e uma conversa sincera para entender que está tudo bem não estar bem ☕✨',
    image: 'https://picsum.photos/600/800?random=1',
    type: 'misto',
  },
  expiresIn: 22,
  timestamp: '2h',
  likes: 2847,
  comments: 189,
  isLiked: false,
  isSaved: false,
};

export function FeedScreen() {
  const handleLike = (postId: string) => {
    // Atualizar estado do post
  };

  return (
    <PostDetail
      post={momentoPost}
      onLike={handleLike}
      onComment={(id) => console.log('Comentar em:', id)}
      onShare={(id) => console.log('Compartilhar:', id)}
      onSave={(id) => console.log('Salvar:', id)}
      variant="card"
    />
  );
}
```

### 2. Recado (Variant: Card)

```tsx
const recadoPost: Post = {
  id: '2',
  type: 'recado',
  from: {
    name: 'Rafael Costa',
    username: 'rafaelc',
    avatar: 'https://i.pravatar.cc/150?img=12',
    verified: false,
  },
  to: {
    name: 'Mariana Silva',
    username: 'marisilva',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
  content: {
    text: 'Obrigado por acreditar em mim quando nem eu mesmo acreditava. Sua amizade é meu porto seguro 🌟',
    type: 'texto',
  },
  timestamp: '4h',
  likes: 1567,
  comments: 67,
  isLiked: false,
};

<PostDetail post={recadoPost} variant="card" />
```

### 3. Post em Fullscreen (Modal)

```tsx
<Modal visible={showPostDetail}>
  <SafeAreaView style={{ flex: 1 }}>
    <PostDetail
      post={selectedPost}
      variant="fullscreen"
      onLike={handleLike}
      showFullContent={true}
    />
  </SafeAreaView>
</Modal>
```

### 4. Apenas Texto

```tsx
const textOnlyPost: Post = {
  id: '3',
  type: 'momento',
  user: {
    name: 'Lucas Mendes',
    username: 'lucasm',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  content: {
    text: 'Começar de novo não é fracasso. É coragem de escrever um novo capítulo da sua história 📖✨',
    type: 'texto',
  },
  timestamp: '6h',
  likes: 3201,
  comments: 234,
};

<PostDetail post={textOnlyPost} variant="card" />
```

### 5. Em uma FlatList (Feed Completo)

```tsx
import { FlatList } from 'react-native';
import { PostDetail } from '@/components/post';

export function HomeScreen() {
  const [posts, setPosts] = useState(FEED_DATA);

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostDetail
      post={item}
      onLike={handleLike}
      onComment={(id) => navigateToComments(id)}
      variant="card"
    />
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id}
    />
  );
}
```

## 🎨 Variantes de Layout

### Card (Padrão)
Usado em feeds e listas. Layout compacto com margem e sombra.

```tsx
<PostDetail post={post} variant="card" />
```

### Fullscreen
Usado em visualizações de detalhe completo. Expande o conteúdo para ocupar mais espaço.

```tsx
<PostDetail post={post} variant="fullscreen" showFullContent={true} />
```

### Modal
Usado em modais bottom-sheet. Sem margens, bordas arredondadas apenas no topo.

```tsx
<PostDetail post={post} variant="modal" />
```

## 🎬 Animações

- **Double-tap na imagem**: Anima um coração flutuante
- **Click no botão de like**: Anima a escala do ícone com spring
- **Efeito de interação**: Todos os botões têm feedback visual

## 🔄 Gerenciamento de Estado

O componente mantém estado interno do post (like, save, contador). Se você quiser sincronizar com estado externo:

```tsx
const [posts, setPosts] = useState([]);

const handleLike = (postId: string) => {
  // Atualizar estado externo
  setPosts(prev => 
    prev.map(p => 
      p.id === postId 
        ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
        : p
    )
  );
};

<PostDetail post={post} onLike={handleLike} />
```

## 📱 Responsividade

O componente é responsivo e se adapta para:
- Diferentes tamanhos de tela
- Orientação (portrait/landscape)
- Diferentes tipos de conteúdo

## 🎯 Caso de Uso: Integração em HomeScreen

```tsx
// Substituir MomentoCard e RecadoCard pelo PostDetail
const renderItem = ({ item }: any) => (
  <PostDetail
    post={item}
    onLike={handleLike}
    onComment={handleComment}
    onShare={handleShare}
    onSave={handleSave}
    variant="card"
  />
);

return (
  <FlatList
    data={feedData}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
  />
);
```

## 🚀 Próximas Melhorias

- [ ] Suporte real para vídeos (reprodução)
- [ ] Suporte real para áudio (reprodução com duração)
- [ ] Comentários inline
- [ ] Compartilhamento em redes sociais
- [ ] Modo dark/light automático
- [ ] Acessibilidade (WCAG)
- [ ] Skeleton loading

## 📝 Estrutura de Pastas

```
src/components/post/
├── PostDetail.tsx           # Componente principal
├── index.ts                 # Exportações
├── POSTDETAIL_GUIDE.md      # Este arquivo
├── CreatePostModal.tsx
├── PostCard.tsx
├── PostContent.tsx
├── PostHeader.tsx
├── PostReactions.tsx
└── PostTimer.tsx
```
