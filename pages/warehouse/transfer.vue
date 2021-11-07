<template>
	<view>
		<view class="warehouse-details__info">
			<view class="details__statics">
				<view class="avatar"><image src="/static/images/avatar.png" mode="widthFix" class="avatar-img"></image></view>
				<view class="details__staticas--right">
					<view>
						<view class="label">币币账户余额</view>
						<view class="num">12321 {{ unit }}</view>
					</view>
					<view>
						<view class="label">游戏账户余额</view>
						<view class="num">12321 {{ unit }}</view>
					</view>
					<view>
						<view class="label">冻结数量</view>
						<view class="num">12321 {{ unit }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="form-wrap">
			<view class="title">选择划转方向:</view>
			<form>
				<radio-group @change="radioChange">
					<label class="uni-list-cell">
						<view>游戏账户 → 币币账户</view>
						<view><radio v-model="formModel.checked1" :checked="checked1" /></view>
					</label>
					<label class="uni-list-cell">
						<view>币币账户 → 游戏账户</view>
						<view><radio v-model="formModel.checked2" :checked="checked2" /></view>
					</label>
				</radio-group>
				<label class="uni-list-cell">
					<view>填写划转数量：</view>
					<input type="text" v-model="formModel.count" placeholder="填写数量" class="input" placeholder-style="color:#ffffff" />
				</label>
				<button type="default" class="form_btn" @click="transfer()">确定</button>
			</form>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			unit: 'CIC',
			checked1: true,
			checked2: false,
			formModel: {
				checked1: '0',
				checked2: '1',
				count: ''
			}
		};
	},
	onLoad() {
		this.setTitle();
	},
	methods: {
		// 设置标题
		setTitle() {
			uni.setNavigationBarTitle({
				title: `划转CIC`
			});
		},
		// 选择划转类型
		radioChange(e) {
			if (e.detail.value == 0) this.checked1 = true;
			else if (e.detail.value == 1) this.checked2 = true;
		},
		// 划转
		transfer() {
			if (!this.formModel.count) {
				uni.showToast({
					title: '请输入划转数量',
					icon: 'none',
					duration: 2000
				});
				return
			}
			//TODO: 调用划转接口
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	width: 100%;
	min-height: 100%;
	background: linear-gradient(to bottom, #11739d, #126c9a, #0b5b8f);
}
</style>
