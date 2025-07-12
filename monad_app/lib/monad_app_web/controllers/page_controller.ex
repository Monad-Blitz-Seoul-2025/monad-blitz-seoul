defmodule MonadAppWeb.PageController do
  use MonadAppWeb, :controller

  def home(conn, _params) do
    features = [
      %{
        icon: "🚀",
        title: "빠른 시작",
        description: "몇 분 안에 프로젝트를 시작할 수 있습니다"
      },
      %{
        icon: "💡",
        title: "혁신적인 아이디어",
        description: "창의적인 솔루션으로 문제를 해결합니다"
      },
      %{
        icon: "🌟",
        title: "프리미엄 경험",
        description: "최고 품질의 서비스를 제공합니다"
      }
    ]

    conn
    |> assign(:page_title, "메인 페이지")
    |> assign_prop(:features, features)
    |> assign_prop(:hero_title, "Welcome to the")
    |> assign_prop(:hero_highlight, "Future")
    |> assign_prop(:subtitle, "이곳은 혁신과 창의성이 만나는 공간입니다.")
    |> assign_prop(:subtitle_highlight, "당신의 꿈을 현실로 만들어보세요.")
    |> assign_prop(:cta_primary, "시작하기")
    |> assign_prop(:cta_secondary, "더 알아보기")
    |> render_inertia("HomePage")
  end
end
