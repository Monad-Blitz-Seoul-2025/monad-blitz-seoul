defmodule MonadAppWeb.PageController do
  use MonadAppWeb, :controller

  def home(conn, _params) do
    features = [
      %{
        icon: "💎",
        title: "자산 인증",
        description: "신뢰할 수 있는 자산 정보를 통한 안전한 매칭"
      },
      %{
        icon: "💕",
        title: "전문 매칭",
        description: "경제적 안정성과 가치관을 고려한 맞춤 매칭"
      },
      %{
        icon: "🌟",
        title: "프리미엄 서비스",
        description: "품격 있는 만남을 위한 차별화된 서비스"
      }
    ]

    conn
    |> assign(:page_title, "런치 옥션")
    |> assign_prop(:features, features)
    |> assign_prop(:hero_title, "진정한 사랑을 위한")
    |> assign_prop(:hero_highlight, "자산 매칭")
    |> assign_prop(
      :subtitle,
      "경제적 안정성을 바탕으로 한 진실한 만남의 시작."
    )
    |> assign_prop(
      :subtitle_highlight,
      "품격 있는 파트너와 함께 미래를 설계하세요."
    )
    |> assign_prop(:cta_primary, "매칭 시작하기")
    |> assign_prop(:cta_secondary, "서비스 알아보기")
    |> render_inertia("HomePage")
  end
end
