<script lang="ts">
  import { colorStrength } from '@/ts/utils';

  const TEAM_COLORS = [
    {
      color: '#58a938',
      brightColor: colorStrength('#58a938', 100)
    },
    {
      color: '#a9383c',
      brightColor: colorStrength('#a9383c', 100)
    },
    {
      color: '#4267c7',
      brightColor: colorStrength('#4267c7', 100)
    },
    {
      color: '#8a38a9',
      brightColor: colorStrength('#8a38a9', 100)
    },
    {
      color: '#a98038',
      brightColor: colorStrength('#a98038', 100)
    },
    {
      color: '#a5a938',
      brightColor: colorStrength('#a5a938', 100)
    },
    {
      color: '#c27ba0',
      brightColor: colorStrength('#c27ba0', 100)
    }
  ];

  let {
    index = 0,
    // characters = [],
    rotation = 0,
    // distanceFromCenter = 0,
    scale = 1
  } = $props();
</script>

<div class="line" style={`transform: rotate(${rotation}deg);`}>
  <div
    class="team"
    style={`transform: translate(-50%, calc(-50% - ${200}px)) rotate(-${rotation}deg);`}
  >
    <div class="team-color" style={`transform: scale(${scale});`}>
      <crow vertical>
        <div>
          <crow gap={2}>
            <div>
              <div class="circle" style={`background: ${TEAM_COLORS[index % 7].color};`}></div>
            </div>
            <div class="team-name" style={`color: ${TEAM_COLORS[index % 7].brightColor};`}>
              <!--{#if !characters[0]?.teamName}
                  team&nbsp;#{index + 1}
                {:else}
                  {characters[0]?.teamName}
                {/if}-->
            </div>
          </crow>
        </div>
        <div>
          <crow gap={4}>
            <div>
              <crow vertical gap={2}>
                <!-- <div><Icon name="resign" /></div> -->
                <div class="beaten">
                  <!--{characters.length - characters.filter(({ removed }) => !removed).length}-->
                </div>
              </crow>
            </div>
            <!-- <div>
                <Crow vertical gap={2}>
                  <div><Icon name="skull" /></div>
                  <div>0</div>
                </Crow>
              </div> -->
          </crow>
        </div>
      </crow>
    </div>
  </div>
</div>

<style>
  .team-name {
    text-transform: capitalize;
  }
  .beaten {
    font-size: 30px;
    line-height: 30px;
  }
  :global(.combat-ring .team-color .content.content) {
    padding: 4px 6px;
  }
  :global(.combat-ring .team-color .crow) {
    flex-wrap: nowrap;
  }
  .team-color {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
  }
  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .team {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all 0.5s ease;
  }
  .line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transition: all 0.5s ease;
    z-index: 1000;
  }
</style>
