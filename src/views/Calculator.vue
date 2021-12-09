<template>
  <div class="about">
    <div class="container">
      <table>
        <tr>
          <td colspan="3">
            <el-input
              class="custom-input"
              type="text"
              id="output"
              readonly="readonly"
              v-model="outputValue"
            ></el-input>
          </td>
          <td>
            <button-comp :value="'c'" :func="calculate" />
          </td>
        </tr>
        <tr v-for="row in items" :key="row.id">
          <td v-for="col in row" :key="col.id">
            <button-comp :value="col" :func="calculate" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import Button from "@/components/Button.vue";

export default defineComponent({
  components: {
    "button-comp": Button,
  },
  setup() {
    const state = reactive({
      items: [
        ["7", "8", "9", "/"],
        ["4", "5", "6", "*"],
        ["1", "2", "3", "-"],
        ["0", ".", "+", "="],
      ],
      result: "0",
      outputValue: "0",
      equalPushed: false,
    });
    const calculate = (cmd: string) => {
      // イコールが押された次の処理
      // 数字が押されたら演算をリセット
      // 演算子、小数点が押されたら継続
      if (state.equalPushed && cmd.match(/[^., +, \-, *, /]/)) {
        state.result = "0";
        state.equalPushed = false;
      } else {
        state.equalPushed = false;
      }

      // 小数点は二つ以上使えない
      if (
        cmd === "." &&
        state.result
          .split(/[+, \-, *, /]/)
          .slice(-1)[0]
          .includes(".")
      ) {
        cmd = "";
      }

      // 通常処理
      if (cmd === "=") {
        try {
          state.result = String(eval(state.result));
        } catch (err) {
          alert("式が未完成です。");
        }
        state.outputValue = eval(state.result);
        state.equalPushed = true;
      } else if (cmd === "c") {
        state.result = "0";
        state.outputValue = state.result;
      } else if (state.result === "0") {
        state.result = cmd;
        state.outputValue = state.result;
      } else {
        state.result += cmd;
        state.outputValue = state.result;
      }
    };
    return {
      ...toRefs(state),
      calculate,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-input >>> .el-input__inner {
  font-size: 18px;
  height: 60px;
  width: 100%;
}
</style>
