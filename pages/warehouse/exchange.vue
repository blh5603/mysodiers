<template>
	<view>
		<view class="warehouse-details__info">
			<view class="details__statics">
				<view class="avatar"><image src="/static/images/avatar.png" mode="widthFix" class="avatar-img"></image></view>
				<view class="details__staticas--right">
					<view>
						<view class="label">当前库存</view>
						<view class="num">21 把</view>
					</view>
					<view>
						<view class="label">可用CIC</view>
						<view class="num">123 CIC</view>
					</view>
					<view>
						<view class="label">可兑换</view>
						<view class="num">321 把</view>
					</view>
				</view>
			</view>
			<view class="details__btn"><view>每把拆除炸弹需要使用{{cicNum}}CIC</view></view>
		</view>
		<view class="form-wrap">
			<form>
				<label class="uni-list-cell">
					<view>请选择想兑换的数量:</view>
					<uni-number-box :min="0" :max="100000" v-model="count"></uni-number-box>
				</label>
				<button type="default" class="form_btn" @click="exchange()">兑换</button>
			</form>
		</view>
	</view>
</template>

<script>
import numberBox from '../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box';
export default {
	components: { numberBox },
	data() {
		return {
			cicNum: 10,
			count: 1
		};
	},
	onLoad(options) {
		this.sequence = options.sequence;
	},
	methods: {
		// TODO: 兑换
		exchange() {}
	}
};
</script>

<style lang="scss" scoped>
page {
	width: 100%;
	min-height: 100%;
	background: linear-gradient(to bottom, #11739d, #126c9a, #0b5b8f);
}
.details__btn {
	color: #ffffff;
}
.form-wrap {
	padding: 32rpx;
	.uni-list-cell {
		color: #ffffff;
		margin: 24rpx 0;
		border: 1px solid #579cc5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx 32rpx;
		border-radius: 12rpx;
		background-color: #2d76a2;
		.input {
			flex: 1;
			text-align: right;
		}
	}
	.form_btn {
		color: #ffffff;
		margin: 40rpx 0;
		border: 1px solid #579cc5;
		background-color: #2d76a2;
		&::after {
			border: none;
		}
	}
	/deep/ .uni-input-input {
		color: #000000;
	}
}
</style>
